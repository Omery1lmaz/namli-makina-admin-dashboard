interface State {
  user: object | null;
  userDetail: object | null;
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: string;
  sellers: any[] | null;
  sellerInfo: any;
  sellerDetails: any;
}

export default State;
