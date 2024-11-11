import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { UserDetailComponent } from "../user-detail/user-detail.component";
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-material-demo',
  templateUrl: './material-demo.component.html',
  styleUrls: ['./material-demo.component.css'],
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    FormsModule,
    CommonModule
]
})
export class MaterialDemoComponent implements AfterViewInit {
  selectedUser: { id: number; name: string; age: number } | null = null;


  displayedColumns: string[] = ['id', 'name', 'age', 'actions'];
  dataSource = new MatTableDataSource([
    { id: 1, name: 'John Doe', age: 25 },
    { id: 2, name: 'Jane Smith', age: 30 },
    { id: 3, name: 'Alice Johnson', age: 28 },
  ]);
element: any;

  constructor(private dialog: MatDialog) {} // Inject MatDialog


  userData = {
    id: null as number | null,
    name: '',
    age: null as number | null,
  };

  isEditMode = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  showDetails(user: any) {
    this.dialog.open(UserDetailComponent, {
      width: '400px',
      data: { user }, // Pass the user data to the dialog
    });
  }

  onSubmit() {
    if (this.isEditMode) {
      // Update existing entry
      const index = this.dataSource.data.findIndex(item => item.id === this.userData.id);
      if (index !== -1) {
        this.dataSource.data[index] = { ...this.userData } as { id: number; name: string; age: number };
        this.dataSource._updateChangeSubscription();  // Trigger table refresh
      }
      this.isEditMode = false;
    } else {
      const newId = this.dataSource.data.length + 1;
      const newEntry = { id: newId, name: this.userData.name, age: this.userData.age ?? 0 };
      this.dataSource.data = [...this.dataSource.data, newEntry];
    }
    this.resetForm();
  }

  onEdit(row: any) {
    this.userData = { ...row };
    this.isEditMode = true;
  }

  onDelete(id: number) {
    this.dataSource.data = this.dataSource.data.filter(item => item.id !== id);
    this.dataSource._updateChangeSubscription();  // Trigger table refresh
  }

  resetForm() {
    this.userData = { id: null, name: '', age: null };
    this.isEditMode = false;
  }
 

  closeDetails() {
    this.selectedUser = null;
  }
}       