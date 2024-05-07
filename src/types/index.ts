export interface fetchedDataType {
  users: number[];
  date: number[];
  month: string;
}

export interface DataPoint {
  x: string;
  y: number;
  a?: number;
}

export interface TypeProps {
  name?: string;
  series: any;
  option: { [key: string]: any };
}

export interface ColumnChartsTypes {
  name?: string;
  data?: { [key: string]: any };
  yearData: any;
}

export interface ChartTypes {
  title?: string;
  data: any[];
  columns: string[];
  filterRecord?: React.ChangeEventHandler<HTMLSelectElement>
}
export interface VisitorsMonitoringCharts {
  countUser: number[];
  dayOfTheMonth: number[];
  month: string;
  toggleMonth: (isCurrentMonth: boolean) => void;
  isCurrentMonth: boolean;
}

export interface NumberPairTypes {
  [index: string]: number;
}

export interface ChartTwoStateType {
  series: {
    name: string;
    data: number[];
  }[];
}

export interface DtrUploadingHistoryTypes{
  title?: string;
  data: { [key: string]: any };
  columns: string[];
  onChangePage: Function;
}