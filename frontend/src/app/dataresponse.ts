export interface LabelData {
    data: DayData[];
    end_date: string;
    labels: string[];
    rating: string;
    source: string;
    start_date: string;
    total: number;
}

export interface DayData {
    BI_ENGINEER: number;
    DATA_ENGINEER: number;
    IRRELEVANT: number;
    average_processing_time: number;
    date: string;
    total: number;
}
