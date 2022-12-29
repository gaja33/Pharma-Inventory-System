import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { Stocks } from "src/app/models/stocks/stocks.model";
import { StocksService } from "src/app/services/stocks/stocks.service";

@Component({
  selector: "app-stocks",
  templateUrl: "./stocks.component.html",
  styleUrls: ["./stocks.component.scss"],
})
export class StocksComponent implements OnInit {
  displayedColumns: string[] = [
    "name",
    "companyName",
    "type",
    "batch",
    "expDate",
    "pricePerPkgOrStrip",
    "totalQty",
    "action",
  ];
  dataSource: MatTableDataSource<Stocks>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private stocksService: StocksService) {}

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.getStocks();
  }

  getStocks() {
    this.stocksService.getAllStocks().subscribe((resp) => {
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

  deleteStock(id) {
    this.stocksService.deleteStocks(id).subscribe((resp) => {
      this.getStocks();
    });
  }
}
