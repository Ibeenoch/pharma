// utils/loadFlutterwave.ts
export function loadFlutterwaveScript(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (
      document.querySelector(
        'script[src="https://checkout.flutterwave.com/v3.js"]'
      )
    ) {
      return resolve(); // Already loaded
    }

    const script = document.createElement("script");
    script.src = "https://checkout.flutterwave.com/v3.js";
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Failed to load Flutterwave SDK"));
    document.body.appendChild(script);
  });
}
