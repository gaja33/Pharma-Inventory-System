import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { Sales } from "src/app/models/sales/sales.model";
import { SalesService } from "src/app/services/sales/sales.service";

@Component({
  selector: "app-bills",
  templateUrl: "./bills.component.html",
  styleUrls: ["./bills.component.scss"],
})
export class BillsComponent implements OnInit {
  displayedColumns: string[] = [
    "billId",
    "billDate",
    "patientName",
    "patientNumber",
    "totalAmt",
    "action",
  ];
  dataSource: MatTableDataSource<Sales>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private salesService: SalesService) {}

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.getSales();
  }

  getSales() {
    this.salesService.getAllSales().subscribe((resp) => {
      // Assign the data to the data source for the table to render
      this.dataSource = new MatTableDataSource(resp);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteSales(id) {
    this.salesService.deleteSales(id).subscribe((resp) => {
      this.getSales();
    });
  }
}
