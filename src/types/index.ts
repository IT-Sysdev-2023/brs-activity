export interface fetchedDataType {
  users: number[];
  date: number[];
  month: string;
}

export interface DataPoint {
  x: string;
  y: number;
}

export interface TypeProps {
  name?: string;
  series: any;
  option: { [key: string]: any };
}

export interface ColumnChartsTypes {
  name?: string;
  data?: any;
  yearData: any;
}

export interface ReconciliationTypesCharts {
  title?: string;
  data: any[];
  columns: string[];
}

export interface UsersActivityCharts {
  title?: string;
  data: any[];
  columns: string[];
}

export interface VisitorsMonitoringCharts {
  countUser: number[];
  dayOfTheMonth: number[];
  month: string;
  toggleMonth: (isCurrentMonth: boolean) => void;
  isCurrentMonth: boolean;
}

export interface NumberPairTypes {
  firstNumber: number;
  secondNumber: number;
}

export interface CardFourTypes {
  totalUsers: number;
  percent: number;
}

export interface BankAccountsTypes {
  activeBankAccounts: number;
  activeBankAccountChanges: number;
}
