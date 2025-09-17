import {Component, inject} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogRef,
    MatDialogTitle
} from '@angular/material/dialog';

@Component({
    selector: 'app-dialog-delete-confirm',
    imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent],
    templateUrl: './dialog-delete-confirm.component.html',
    styleUrl: './dialog-delete-confirm.component.scss'
})
export class DialogDeleteConfirmComponent {
    readonly dialogRef = inject(MatDialogRef<DialogDeleteConfirmComponent>);
}
