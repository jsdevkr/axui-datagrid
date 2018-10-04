export declare class PrintDate {
    static i18n: any;
    currDate: Date;
    static setI18n(i18n: any): any;
    constructor();
    setDate(date: any): this;
    print(format?: string, utc?: boolean, gmt?: boolean): string | Date;
}
export declare function printDate(d: any, format: string): string | Date;
