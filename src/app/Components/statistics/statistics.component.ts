import { Component, OnInit } from '@angular/core';
import { faImages, faUsers } from '@fortawesome/free-solid-svg-icons';
import { Chart } from 'chart.js';

import { PostService } from './../../Services/post/post.service';
import { UserService } from './../../Services/user/user.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {
  usersIcon = faUsers; postsIcon = faImages;
  users: number;
  loggedinUsers: number;
  posts: number;

  constructor(private userService: UserService, private postService: PostService) { }

  ngOnInit(): void {
    this.countUsers();
    this.countPosts();
    this.countLoggedInUsers();
    this.barChart();
  }

  ngOnChanges(): void {
    this.barChart();
  }

  countUsers() {
    this.userService.countUsers().subscribe(data => {
      this.users = data;
    },
      err => {
        console.log(err);
      });
  }

  countLoggedInUsers() {
    this.userService.countLoggedinUsers().subscribe(data => {
      this.loggedinUsers = data;
    },
      err => {
        console.log(err);
      });
  }

  countPosts() {
    this.postService.countPosts().subscribe(data => {
      this.posts = data;
    },
      err => {
        console.log(err);
      });
  }

  barChart() {
    const barChart = new Chart('barChart', {
      type: 'bar',
      data: {
        labels: ['Users', 'Posts'],
        datasets: [
          {
            data: [5, 7],
            backgroundColor: ["#3cba9f", "#ffcc00"],
            borderColor: ["#ffcc00", "#3cba9f"],
            borderWidth: 1
          },
        ]
      },
      options: {
        responsive: true,
        legend: {
          display: false
        },
        scales: {
          xAxes: [{
            display: true
          }],
          yAxes: [{
            display: true,
            ticks:{
              beginAtZero: true
            }
          }],
        }
      }
    });
  }

}
