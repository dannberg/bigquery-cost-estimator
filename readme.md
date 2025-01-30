# **BigQuery Cost Estimator**

📊 **Automatically replaces BigQuery’s query size estimate (GB) with the estimated cost in USD.**

![GitHub](https://img.shields.io/github/license/dannberg/bigquery-cost-estimator?cacheSeconds=60)
![GreasyFork](https://img.shields.io/badge/GreasyFork-Script-orange)
![BigQuery](https://img.shields.io/badge/Google-Cloud-blue)

## 🚀 **Overview**
Google BigQuery displays a message like:
> _"This query will process 11.37 GB when run."_

This script dynamically **replaces that text with the estimated cost** based on Google’s **on-demand pricing**.
💰 **Cost Calculation:** `$6.25 per TB processed`

---

## ✨ **Features**
- ✔ **Real-time cost calculation** as you type queries
- ✔ **MutationObserver support** for dynamic updates
- ✔ **Lightweight & fast**, no external dependencies
- ✔ **Works in Chrome, Firefox, Edge, Brave, & Safari**

---

## 🛠 **Installation**

### **1️⃣ Install a Userscript Manager**
This script works with:
- [**ViolentMonkey**](https://violentmonkey.github.io/get-it/) (Recommended)
- [**TamperMonkey**](https://www.tampermonkey.net/)

### **2️⃣ Install the Script**
🔹 **From GreasyFork**: [BigQuery Cost Estimator](https://greasyfork.org/en/scripts/525352-bigquery-cost-estimator)

🔹 **From GitHub**:
Click **[Here](https://github.com/dannberg/bigquery-cost-estimator/raw/refs/heads/master/bigquery-cost-estimator.user.js)** to install manually.

### **3️⃣ Open BigQuery & Run a Query**
- The **GB estimate** will be replaced with the **cost estimate** automatically.

---

## 🏗 **How It Works**
1. **Finds the GB estimate** in BigQuery’s UI.
2. **Extracts the numeric value** from the message.
3. **Calculates the cost** using `$6.25 per TB`.
4. **Replaces the text** dynamically.

📌 **Example Calculation:**
```
Query processes: 11.37 GB
Cost = (11.37 GB ÷ 1024) × 6.25
Cost = $0.07
```
BigQuery now displays:
> _"Estimated cost: $0.07"_

---

## ⚡ **Technical Details**
- Uses **MutationObserver** to detect changes in BigQuery’s UI.
- Targets the element: `div.cfc-truncated-text.ng-star-inserted`.
- **Does not interfere** with BigQuery’s functionality.

---

## 🚀 **Contributing**
Want to improve this script? PRs are welcome!

### **To Contribute:**
1. **Fork this repo**
2. **Clone your fork**
```sh
   git clone https://github.com/dannberg/bigquery-cost-estimator.git
```
3. **Make changes & push**
```sh
git commit -m "Improved cost calculation"
git push origin main
```
4. **Submit a Pull Request (PR)**

---
## 📝 License

This project is licensed under the MIT License – you’re free to use, modify, and distribute it!

---
## 🔗 Links & Resources
- 📜 **GreasyFork Script**: [BigQuery Cost Estimator](https://greasyfork.org/en/scripts/525352-bigquery-cost-estimator)
- 🏗 **GitHub Repository**: [GitHub](https://github.com/dannberg/bigquery-cost-estimator)
- 🌎 **Google BigQuery Pricing**: [BigQuery Pricing Docs](https://cloud.google.com/bigquery/pricing)
