export interface Sales {
  billId: string;
  billDate: string;
  totalAmt: string;
  tax: string;
  discount: string;
  paidAmt: string;
  paymentMode: number;
  patientInfo: Info;
  doctorInfo: Info;
  items: any;
  userId: string;
  storeId: string;
}
export interface Info {
  name: string;
  contactNumber: number;
}
