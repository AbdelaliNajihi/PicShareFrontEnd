import { Component, OnInit } from '@angular/core';
import { faUserEdit } from '@fortawesome/free-solid-svg-icons';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { faUserTimes } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { ConfirmationService, MessageService } from 'primeng/api';

import { Role } from 'src/app/Models/role/role';
import { RoleService } from './../../Services/role/role.service';
import { LoginService } from './../../Services/login/login.service';
import { UserService } from './../../Services/user/user.service';
import { User } from './../../Models/user/user';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: User[];
  user: User;
  userId: number;
  roles: Role[];
  role: Role;
  name: string;
  userEditIcon = faUserEdit;
  addRoleIcon = faUserPlus;
  removeRoleIcon = faUserTimes;
  deleteUserIcon = faTrash;

  constructor(private userService: UserService, private loginService: LoginService,
    private roleService: RoleService, private messageService: MessageService) {
  }

  ngOnInit(): void {
    this.getAllUsers();
    this.getAllRoles();
  }

  getAllUsers() {
    this.userService.getAllUsers().subscribe(data => {
      this.users = data;
      console.log(data);
    })
  }

  getUser(user: User) {
    this.userService.getUserById(user.userId).subscribe(data => {
      this.user = data;
      console.log(data);
    });
  }

  getAllRoles() {
    this.roleService.getAllRoles().subscribe(data => {
      this.roles = data;
      console.log(data);
    });
  }

  addRole(userId: number, name: string) {
    this.userService.addRoleToUser(userId, name).subscribe(res => {
      console.log(res);
    });
    window.location.reload();
  }

  removeRole(userId: number, name: string) {
    this.userService.removeRoleFromUser(userId, name).subscribe(res => {
      console.log(res);
    });
    window.location.reload();
  }

  deleteUser(userId: number) {
    this.userService.deleteUser(userId).subscribe(data => {
      console.log(data);
      window.location.reload();
    });
  }

  showConfirm(username: string) {
    this.messageService.add({ key: 'c', sticky: true, severity: 'error', summary: 'Are you sure ?', detail: ''+username+' is going to be deleted'});
  }

  onReject() {
    this.messageService.clear('c');
  }

}
