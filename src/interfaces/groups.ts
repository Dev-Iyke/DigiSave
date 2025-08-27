export interface GeneralFetchingParams {
  groupId: string;
}

export interface Group {
  _id: string;
  groupName: string;
  contributionAmount: number;
  currentPayoutIndex: number;
  payoutOrder: number[];
  createdAt: string;
  hasAdminManipulation: boolean;
  hasSkippedContribution: string;
  membersList: string[];
  totalBalance: number;
}