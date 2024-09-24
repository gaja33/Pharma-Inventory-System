import {
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { MedicineTypes } from "src/app/models/medicine-types/medicine-types.model";
import { MedicineTypesService } from "src/app/services/medicine-types/medicine-types.service";
import { MedicineTypesAddEditComponent } from "./medicine-types-add-edit/medicine-types-add-edit.component";

@Component({
  selector: "app-medicine-types",
  templateUrl: "./medicine-types.component.html",
  styleUrls: ["./medicine-types.component.scss"],
})
export class MedicineTypesComponent implements OnInit {
  displayedColumns: string[] = ["typeName", "action"];
  dataSource: MatTableDataSource<MedicineTypes>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private medicineTypesService: MedicineTypesService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.getMedecineTypes();
  }

  getMedecineTypes() {
    this.medicineTypesService.getAllMedicineTypes().subscribe((resp) => {
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

  deleteCategory(id) {
    this.medicineTypesService.deleteMedicineTypes(id).subscribe((resp) => {
      this.getMedecineTypes();
    });
  }

  openDialog(obj) {
    console.log(obj);
    const dialogRef = this.dialog.open(MedicineTypesAddEditComponent, {
      data: obj,
      disableClose: true,
      width: "25%",
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result:`, result);
      if (result.event == "Submit" || result.event == "Update") {
        this.getMedecineTypes();
      }
    });
  }
}
