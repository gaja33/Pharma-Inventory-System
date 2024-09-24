export interface Stocks {
  name: string;
  companyName: string;
  type: string;
  batch: string;
  mfgDate: string;
  expDate: string;
  pricePerPkgOrStrip: number;
  itemsInPkgOrStrip: number;
  qty: number;
  looseQty: number;
  shelfName: string;
  dealerInfo: DealerInfo;
  gstHsnInfo: GstHsnInfo;
}
export interface DealerInfo {
  name: string;
  contactNumber: number;
}
export interface GstHsnInfo {
  hsnCode: string;
  cgst: number;
  sgst: number;
  igst: number;
}
