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
import { Doctors } from "src/app/models/doctors/doctors.model";
import { DoctorsService } from "src/app/services/doctors/doctors.service";
import { DoctorsAddEditComponent } from "./doctors-add-edit/doctors-add-edit.component";

@Component({
  selector: "app-doctors",
  templateUrl: "./doctors.component.html",
  styleUrls: ["./doctors.component.scss"],
})
export class DoctorsComponent implements OnInit {
  displayedColumns: string[] = ["name", "contactNumber", "action"];
  dataSource: MatTableDataSource<Doctors>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private doctorsService: DoctorsService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.getDoctors();
  }

  getDoctors() {
    this.doctorsService.getAllDoctors().subscribe((resp) => {
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

  deleteDoctor(id) {
    this.doctorsService.deleteDoctors(id).subscribe((resp) => {
      this.getDoctors();
    });
  }

  openDialog(obj) {
    console.log(obj);
    const dialogRef = this.dialog.open(DoctorsAddEditComponent, {
      data: obj,
      disableClose: true,
      width: "25%",
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result:`, result);
      if (result.event == "Submit" || result.event == "Update") {
        this.getDoctors();
      }
    });
  }
}
