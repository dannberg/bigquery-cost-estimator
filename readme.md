# **BigQuery Cost Estimator**

📊 **Automatically replaces BigQuery’s query size estimate (GB/TB) with the estimated cost in USD.**

![GitHub](https://img.shields.io/github/license/dannberg/bigquery-cost-estimator?cacheSeconds=60)
![GreasyFork](https://img.shields.io/badge/GreasyFork-Script-orange)
![BigQuery](https://img.shields.io/badge/Google-Cloud-blue)

![Screenshot of before and after this script is enabled](https://github.com/user-attachments/assets/5e7223f6-055e-490b-927f-70f77f008717)

## 🚀 **Overview**
Google BigQuery displays a message like:
> _"This query will process 11.37 GB when run."_ or _"This query will process 1.12 TB when run."_

This script dynamically **replaces that text with the estimated cost** based on Google’s **on-demand pricing**.
💰 **Cost Calculation:** `$6.25 per TB processed` (handles both GB and TB estimates)

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
- The **GB/TB estimate** will be replaced with the **cost estimate** automatically.

---

## 🏗 **How It Works**
1. **Finds the GB/TB estimate** in BigQuery’s UI.
2. **Extracts the numeric value and unit** from the message.
3. **Calculates the cost** using `$6.25 per TB`.
4. **Replaces the text** dynamically (consolidates duplicates when BigQuery renders the message multiple times).

📌 **Example Calculations:**
```
GB: 11.37 GB → Cost = (11.37 ÷ 1024) × 6.25 = $0.07
TB: 1.12 TB  → Cost = 1.12 × 6.25 = $7.00
```
BigQuery now displays:
> _"Estimated cost: $0.07"_ or _"Estimated cost: $7.00"_

---

## ⚡ **Technical Details**
- Uses **MutationObserver** (childList and characterData) to detect changes in BigQuery’s UI.
- Finds the status element via known selectors first, then a content-based DOM search for "This query will process" (handles UI structure changes).
- When BigQuery renders the estimate in multiple elements, replaces the common parent to avoid duplicate display.
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
