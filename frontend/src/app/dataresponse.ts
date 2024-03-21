export interface LabelData {
    data: DayData[];
    end_date: string;
    label: string;
    rating: number;
    source: string;
    start_date: string;
}

export interface DayData {
    average_certainty: number;
    average_processing_time: number;
    date: string;
    total: number;
}
