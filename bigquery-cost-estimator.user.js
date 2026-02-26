// ==UserScript==
// @name         BigQuery Cost Estimator
// @namespace    https://bigquery.cloud.google.com/
// @version      1.10
// @description  Dynamically replace BigQuery's query size estimate (GB/TB) with the estimated cost in USD.
// @author       Dann Berg
// @match        https://console.cloud.google.com/bigquery*
// @run-at       document-end
// @license      MIT
// @homepageURL  https://greasyfork.org/en/scripts/525352-bigquery-cost-estimator
// @supportURL   https://github.com/dannberg/bigquery-cost-estimator/issues
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    const PRICE_PER_TB = 6.25;
    const GB_TO_TB = 1024;
    const TARGET_PHRASE = "This query will process";

    const SIZE_PATTERN = /[\d.]+\s*(GB|TB)/;

    function findAllStatusElements() {
        let candidates = [];
        const selectors = [
            'span.cfc-truncated-text[aria-hidden="true"]',
            '.cfc-truncated-text[aria-hidden="true"]',
            'div.cfc-truncated-text.ng-star-inserted',
            '.cfc-truncated-text'
        ];
        for (const selector of selectors) {
            candidates = Array.from(document.querySelectorAll(selector))
                .filter(el => el.textContent.includes(TARGET_PHRASE) && SIZE_PATTERN.test(el.textContent));
            if (candidates.length > 0) break;
        }
        if (candidates.length === 0) {
            const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_ELEMENT, null);
            let node, bestMatch = null;
            while ((node = walker.nextNode())) {
                const text = node.textContent || '';
                if (text.includes(TARGET_PHRASE) && SIZE_PATTERN.test(text) &&
                    (!bestMatch || text.length < (bestMatch.textContent || '').length)) {
                    bestMatch = node;
                }
            }
            return bestMatch ? [bestMatch] : [];
        }
        // Keep only leaf elements (exclude parents that contain another match)
        return candidates.filter(el => !candidates.some(other => other !== el && el.contains(other)));
    }

    const COST_PREFIX = 'Estimated cost: $';

    function getCommonParent(elements) {
        if (elements.length < 2) return null;
        let parent = elements[0].parentElement;
        while (parent) {
            if (elements.every(el => parent.contains(el))) return parent;
            parent = parent.parentElement;
        }
        return null;
    }

    function updateCost() {
        const elements = findAllStatusElements();
        if (elements.length === 0) return;

        const first = elements[0];
        const match = first.textContent.match(/([\d.]+)\s*(GB|TB)/i);
        if (!match || !first.textContent.includes(TARGET_PHRASE)) return;

        const value = parseFloat(match[1]);
        const unit = (match[2] || '').toUpperCase();
        if (isNaN(value)) return;

        const cost = unit === 'TB'
            ? (value * PRICE_PER_TB).toFixed(2)
            : ((value / GB_TO_TB) * PRICE_PER_TB).toFixed(2);

        observer.disconnect();
        if (elements.length > 1) {
            const parent = getCommonParent(elements);
            if (parent) {
                parent.textContent = `${COST_PREFIX}${cost}`;
            } else {
                first.textContent = `${COST_PREFIX}${cost}`;
                for (let i = 1; i < elements.length; i++) {
                    elements[i].textContent = '';
                    elements[i].style.cssText = 'display:none!important;visibility:hidden!important;height:0!important;overflow:hidden!important;';
                }
            }
        } else {
            first.textContent = `${COST_PREFIX}${cost}`;
        }
        observer.observe(document.body, observerConfig);
    }

    function debouncedUpdateCost() {
        requestAnimationFrame(updateCost);
    }

    const observerConfig = {
        childList: true,
        subtree: true,
        characterData: true
    };
    const observer = new MutationObserver(debouncedUpdateCost);
    observer.observe(document.body, observerConfig);

    updateCost();
})();
