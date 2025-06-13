/* -------- SheetJS / XLSX (минимум методов, которые мы вызываем) -------- */
declare const XLSX: {
  read: (...args: any[]) => any;
  writeFile: (...args: any[]) => void;
  utils: {
    aoa_to_sheet: (...args: any[]) => any;
    sheet_to_json: (...args: any[]) => any;
    book_new: () => any;
    book_append_sheet: (...args: any[]) => void;
  };
};

/* -------- Tabulator (только то, что используем) ------------------------- */
declare class Tabulator {
  constructor(el: any, options?: any);
  download(type: string, filename: string, opts?: any): void;
  setLocale(locale: string): void;
  destroy(): void;
}

/* -------- mathjs, Vue $t, jsPDF (заглушки) ------------------------------ */
declare const math: any;
declare function $t(key: string): string;
declare namespace jspdf { const jsPDF: any; }
