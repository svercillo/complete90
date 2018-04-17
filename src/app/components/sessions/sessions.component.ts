import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services';

@Component({
  selector: 'app-sessions',
  templateUrl: './sessions.component.html',
  styleUrls: ['./sessions.component.css']
})
export class SessionsComponent implements OnInit {

  filters = {
    tags: [],
    categories: [],
    skillLevel: ['Beginner', 'Intermediate', 'Expert']
  }

  selectedFilter = {
    tag: '',
    category: '',
    skillLevel: ''
  }

  sessions = [];

  constructor(private dataService: DataService) {
    // get free content
    dataService.getFreeSessions().subscribe((response) => {
      if (!response.success) return;
      this.collectTagsAndCategories(response.content);
      this.sessions.push(...response.content);
    });

    dataService.getSessions().subscribe((response) => {
      if (!response.success) return;
      this.collectTagsAndCategories(response.content)
      this.sessions.push(...response.content);
    });
  }

  selectTag(tag) {
    this.selectedFilter.tag = tag;
  }

  selectCategory(category) {
    this.selectedFilter.category = category;
  }

  selectSkillLevel(skillLevel) {
    this.selectedFilter.skillLevel = skillLevel;
  }

  ngOnInit() {
  }

  collectTagsAndCategories(sessions) {
    let tags = this.filters.tags;
    for (let session of sessions) {
      this.filters.categories.push(session.name);

      for (let content of session.content) {
        if (content.tags) tags.push(...content.tags);
      }
    }

    this.filters.tags = tags.filter(function (value, index, self) {
      return self.indexOf(value) === index;
    });
  }

}
