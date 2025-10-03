import {
  Bell,
  CircleAlert,
  Download,
  Globe,
  Moon,
  Shield,
  Sun,
  Trash2,
} from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { setTheme, toggleTheme } from "../redux/themeSlice";
import { setBaseCurrency } from "../redux/currencySlice";
import { Switch } from "@headlessui/react";
import { useEffect } from "react";
import Dropdown from "../components/Dropdown";
import ToggleButton from "../components/ToggleButton";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { clearTransactions } from "../redux/transactionalSlice";
import Swal from "sweetalert2";
import { clearBudgets } from "../redux/budgetSlice";

function Settings() {
  const theme = useSelector((state) => state.theme.mode); // "light" or "dark"
  const dispatch = useDispatch();

  const handleToggle = () => {
    dispatch(toggleTheme());
  };

  const enabled = theme === "dark";

  useEffect(() => {
    const html = document.documentElement;
    if (enabled) {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }
  }, [enabled]);

  const currencyOptions = [
    { value: "INR", label: "INR - Indian Rupee (₹)" },
    { value: "USD", label: "USD - US Dollar ($)" },
    { value: "EUR", label: "EUR - Euro (€)" },
    { value: "GBP", label: "GBP - British Pound (£)" },
    { value: "JPY", label: "JPY - Japanese Yen (¥)" },
    { value: "AUD", label: "AUD - Australian Dollar (A$)" },
  ];
  const baseCurrency = useSelector((state) => state.currency.base);

  const handleChange = (value) => {
    console.log("Selected currency:" + value);
    dispatch(setBaseCurrency(value));
  };

  console.log("Base Currency in Settings:", baseCurrency);

  const transactions = useSelector((state) => state.transaction.list);

  const handleExport = () => {
    const localData = JSON.parse(localStorage.getItem("transactions") || "[]");
    const combinedData = [...transactions, ...localData];

    const worksheet = XLSX.utils.json_to_sheet(combinedData);

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Transactions");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const data = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(data, "transactions.xlsx");
  };

  const handleClearData = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "This will delete all your transaction data permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        // Clear localStorage
        localStorage.removeItem("transactions");

        // Clear Redux state
        dispatch(clearTransactions());
        dispatch(clearBudgets());

        Swal.fire("Deleted!", "All your data has been deleted.", "success");
      }
    });
  };
  return (
    <div className="space-y-6 w-full max-w-3xl mx-auto p-2 sm:p-4">
      {/* Data & Privacy Card */}

      <div className="w-full flex flex-col justify-start items-start">
        <h1 className="text-3xl font-semibold mb-1">Settings</h1>
        <p className="text-gray-500 text-sm md:text-md">
          Customize your FinanceTracker experience
        </p>
      </div>

      <div className="w-full flex justify-start gap-2 items-center border border-gray-300 rounded-2xl p-2 md:p-4">
        <span className="flex justify-center items-center ml-4">
          Appearance
        </span>

        <div className="flex items-center lg:gap-4 ml-auto">
          <Sun
            size={24}
            color={!enabled ? "#374151" : "#9CA3AF"}
            className="mr-2"
          />

          <Switch
            checked={enabled}
            onChange={handleToggle}
            className={`flex items-center relative h-5 w-10 md:h-7 md:w-14 shrink-0 cursor-pointer rounded-full transition-colors duration-200 focus:outline-none ${
              enabled ? "bg-green-400" : "bg-gray-300"
            }`}
          >
            <span
              aria-hidden="true"
              className={`pointer-events-none inline-block h-4 w-4 md:h-6 md:w-6 transform rounded-full bg-white shadow ring-0 transition-transform duration-200 ${
                enabled ? "translate-x-6 md:translate-x-7" : "translate-x-0"
              }`}
            />
          </Switch>

          <Moon
            size={24}
            color={enabled ? "#F8FAFC" : "#374151"}
            className="mr-2"
          />
        </div>
      </div>

      <div className="w-full flex flex-col md:flex-row justify-center items-center md:items-center md:justify-between border border-gray-300 rounded-2xl p-4 gap-4">
        <span className="flex items-center text-base md:text-sm sm:text-xs ml-2">
          <span className="mr-2">
            <Globe />
          </span>
          Currency Settings
        </span>
        <div className="w-full mr-16 md:mr-0 md:w-auto flex justify-end">
          <Dropdown
            label="Base Currency"
            options={currencyOptions}
            value={baseCurrency}
            onChange={handleChange}
            placeholder="Currency"
            className="ml-8 md:ml-0"
            showPlaceholder={false}
          />
        </div>
      </div>

      <div className="w-full flex flex-col items-start gap-4 border border-gray-300 rounded-2xl p-4">
        <span className="flex justify-center items-center ml-4">
          <span className="mr-2">
            <Bell />
          </span>
          Notifications
        </span>
        <div className="w-full flex items-center justify-between mt-4 ml-4">
          <div>
            <span className="font-semibold">Budget Alerts</span>
            <p className="text-sm text-muted-foreground">
              Get notified when you approach budget limits
            </p>
          </div>
          <span className="mr-4">
            <ToggleButton />
          </span>
        </div>

        <div className="w-full flex items-center justify-between ml-4">
          <div>
            <span className="font-semibold">Weekly Reports</span>
            <p className="text-sm text-muted-foreground">
              Receive weekly spending summaries
            </p>
          </div>
          <span className="mr-4">
            <ToggleButton />
          </span>
        </div>
        <div className="w-full flex items-center justify-between ml-4">
          <div>
            <span className="font-semibold">Transaction Notifications</span>
            <p className="text-sm text-muted-foreground">
              Get notified for each new transaction
            </p>
          </div>
          <span className="mr-4">
            <ToggleButton />
          </span>
        </div>
      </div>
      <div className="w-full flex flex-col items-start gap-4 border border-gray-300 rounded-2xl p-4">
        <span className="flex justify-center items-center ml-4">
          <span className="mr-2">
            <Shield />
          </span>
          Data & Privacy
        </span>
        <div className="w-full flex items-center justify-between mt-4 ml-4">
          <div>
            <span className="font-semibold">Auto Sync</span>
            <p className="text-sm text-muted-foreground">
              Automatically sync data across devices
            </p>
          </div>
          <span className="mr-4">
            <ToggleButton />
          </span>
        </div>
        <hr className="my-2" />
        <div className="font-medium mb-1">Data Management</div>
        <div className="flex flex-col md:flex-row gap-2 w-full">
          <button
            onClick={handleExport}
            className="flex-1 border border-gray-300 rounded-lg py-2 px-4 flex items-center justify-center gap-2 text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
          >
            <span>
              <Download />
            </span>
            Export Data
          </button>
          <button
            onClick={handleClearData}
            className="flex-1 bg-red-600 hover:bg-red-700 text-white rounded-lg py-2 px-4 flex items-center justify-center gap-2 transition"
          >
            <span>
              <Trash2 />
            </span>
            Clear All Data
          </button>
        </div>
        <div className="bg-orange-50 border border-orange-200 text-orange-700 rounded-lg p-3 flex items-center gap-2 mt-2">
          <span>
            <CircleAlert />
          </span>
          <div>
            <span className="font-semibold">Data Retention</span>
            <div className="text-xs">
              Your transaction data is kept for 12 months. Older data is
              automatically archived for privacy and performance.
            </div>
          </div>
        </div>
      </div>

      {/* App Information*/}
      <div className="rounded-2xl border border-gray-200 bg-white dark:bg-gray-900 shadow-sm p-4 md:p-6 flex flex-col gap-4 w-full">
        <h2 className="text-lg font-semibold mb-2">App Information</h2>
        <div className="flex flex-col sm:flex-row sm:justify-between gap-2">
          <div>
            <div className="text-xs text-gray-500">Version</div>
            <div className="font-semibold">1.2.0</div>
          </div>
          <div>
            <div className="text-xs text-gray-500">Last Updated</div>
            <div className="font-semibold">Oct 2024</div>
          </div>
          <div>
            <div className="text-xs text-gray-500">Data Size</div>
            <div className="font-semibold">2.4 MB</div>
          </div>
          <div>
            <div className="text-xs text-gray-500">Transactions</div>
            <div className="font-semibold">247 records</div>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          <button className="border border-gray-300 rounded-lg py-1 px-3 text-xs text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition">
            Privacy Policy
          </button>
          <button className="border border-gray-300 rounded-lg py-1 px-3 text-xs text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition">
            Terms of Service
          </button>
          <button className="border border-gray-300 rounded-lg py-1 px-3 text-xs text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition">
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
}

export default Settings;
