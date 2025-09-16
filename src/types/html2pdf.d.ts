declare module 'html2pdf.js' {
  interface Html2PdfOptions {
    margin?: number | number[];
    filename?: string;
    image?: {
      type: 'jpeg' | 'png' | 'webp';
      quality: number;
    };
    html2canvas?: {
      scale?: number;
      useCORS?: boolean;
      letterRendering?: boolean;
      allowTaint?: boolean;
    };
    jsPDF?: {
      unit: 'pt' | 'mm' | 'cm' | 'in';
      format: string | number[];
      orientation: 'portrait' | 'landscape';
      compress?: boolean;
    };
  }

  interface Html2Pdf {
    set(options: Html2PdfOptions): Html2Pdf;
    from(element: HTMLElement): Html2Pdf;
    save(): Promise<void>;
  }

  function html2pdf(): Html2Pdf;
  export = html2pdf;
}