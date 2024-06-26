import { SelectionModel } from '@angular/cdk/collections';
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { HttpClient } from '@angular/common/http';
import { Todos } from '../model/todo.interface';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { ApiService } from '../services/api.service';




@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatIconModule,MatTableModule,CommonModule,MatCheckboxModule,MatProgressSpinnerModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  displayedColumns: string[] = ['select', 'id', 'Todo', 'Edit','Delete'];
  dataSource: MatTableDataSource<Todos>;
  selection = new SelectionModel<Todos>(true, []);
  todo: Todos[]=[];
  isLoading:boolean=true;
  constructor(public api:ApiService){
    this.dataSource = new MatTableDataSource<Todos>(this.todo);
  }
    ngOnInit(): void {

        this.api.getTodos().subscribe((data:any)=>{
          this.todo=data.todos;
          this.isLoading=false;
          console.log(this.todo);
        })

  }


    isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Todos): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }
}
