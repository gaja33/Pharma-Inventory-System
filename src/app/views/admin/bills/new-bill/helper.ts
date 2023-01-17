import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fonts";

export const generatePDF = (mode, data) => {
  console.log(data);
  // playground requires you to assign document definition to a variable called dd

  var documentDefinition: any = {
    content: [
      {
        columns: [
          [
            {
              width: "70%",
              text: "Siddhi Sai Medicals",
              fontSize: 16,
              bold: true,
            },
            {
              width: "70%",
              text: "#15, 1st Main, Behind shell petrol bunk, \n Kengeri Satellite town. Bengaore - 60 \n Ph No: 9480001186",
            },
            {
              width: "70%",
              text: [
                {
                  text: "GST No: ",
                  bold: true,
                },
                {
                  text: "29AMYPR9634D1Z5",
                },
              ],
            },
          ],
          {
            width: "30%",
            text: `Patient: ${data.patientInfo.name} \n Mob No: ${data.patientInfo.contactNumber} \n Doctor: ${data.doctorInfo.name} \n Mob no: ${data.doctorInfo.contactNumber}`,
            alignment: "left",
          },
        ],
      },
      { text: "\n" },
      {
        width: "100%",
        text: "INVOICE",
        fontSize: 16,
        bold: true,
        alignment: "center",
      },
      {
        columns: [
          {
            width: "50%",
            text: `Bill: ${data.billId}`,
            alignment: "center",
            color: "red",
          },
          {
            width: "50%",
            text: `Date: ${data.billDate}`,
            alignment: "center",
          },
        ],
      },
      getItems(data.items, data),
      {
        columns: [
          [
            {
              width: "100%",
              text: `Tax: Rs. ${data.tax}`,
              bold: true,
              alignment: "right",
            },
            {
              width: "100%",
              text: `Discount: Rs. ${data.discount}`,
              bold: true,
              alignment: "right",
            },
            {
              width: "100%",
              text: `Balance: Rs. ${data.balance}`,
              bold: true,
              alignment: "right",
            },
            {
              width: "100%",
              text: `TOTAL: Rs. ${data.totalAmt}`,
              bold: true,
              alignment: "right",
            },
          ],
        ],
      },
    ],
    styles: {
      header: {
        fontSize: 18,
        bold: true,
        margin: [0, 0, 0, 10],
      },
      subheader: {
        fontSize: 16,
        bold: true,
        margin: [0, 10, 0, 5],
      },
      tableExample: {
        margin: [0, 5, 0, 15],
      },
      tableHeader: {
        bold: true,
        fontSize: 13,
        color: "black",
      },
    },
  };

  switch (mode) {
    case "open":
      pdfMake
        .createPdf(documentDefinition, null, null, pdfFonts.pdfMake.vfs)
        .open();
      break;
    case "print":
      pdfMake
        .createPdf(documentDefinition, null, null, pdfFonts.pdfMake.vfs)
        .print();
      break;
    case "download":
      pdfMake
        .createPdf(documentDefinition, null, null, pdfFonts.pdfMake.vfs)
        .download();
      break;

    default:
      pdfMake
        .createPdf(documentDefinition, null, null, pdfFonts.pdfMake.vfs)
        .open();
      break;
  }
};

const getItems = (items, data) => {
  const exs = [];

  items.forEach((item, index) => {
    exs.push([
      item.qty,
      item.itemName,
      item.itemDetails.companyName,
      item.itemDetails.batch,
      item.itemDetails.expDate,
      item.itemDetails.gstHsnInfo.hsnCode,
      {
        text: `CGST: ${item.totalTax / 2} \n SGST: ${item.totalTax / 2}`,
        fontSize: 8,
      },
      item.itemDetails.pricePerPkgOrStrip,
      `${item.qty * item.itemDetails.pricePerItem}`,
    ]);
  });

  return {
    style: "tableExample",
    table: {
      headerRows: 1,
      widths: [30, "*", "*", "*", 40, 40, 40, "*", "*"],
      body: [
        [
          {
            text: "Qty",
            style: "tableHeader",
          },
          {
            text: "Content",
            style: "tableHeader",
          },
          {
            text: "Company",
            style: "tableHeader",
          },
          {
            text: "Batch",
            style: "tableHeader",
          },
          {
            text: "Expiry",
            style: "tableHeader",
          },
          {
            text: "HSN",
            style: "tableHeader",
          },
          {
            text: "GST",
            style: "tableHeader",
          },
          {
            text: "MRP",
            style: "tableHeader",
          },
          {
            text: "Amount",
            style: "tableHeader",
          },
        ],
        ...exs,
      ],
    },
  };
};
