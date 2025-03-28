export function useScript(src: string, type?: string, nomodule?: boolean): Promise<HTMLScriptElement> {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = src;

    if (type) {
      script.type = type;
    }

    if (nomodule) {
      script.setAttribute("nomodule", "");
    }

    script.onload = () => resolve(script);
    script.onerror = reject;

    script.setAttribute('defer', 'true');

    document.head.appendChild(script);
  });
}