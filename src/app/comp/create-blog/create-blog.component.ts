import { Component, OnInit } from "@angular/core";
import { SYGDatabaseService } from "src/app/service/sygdatabase.service";
import { Blog } from "../../models/blog";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
  selector: "app-create-blog",
  templateUrl: "./create-blog.component.html",
  styleUrls: ["./create-blog.component.css"]
})
export class CreateBlogComponent implements OnInit {
  constructor(private syg: SYGDatabaseService, public router: Router) {}

  createdBlog: Blog;

  createABlogForm = new FormGroup({
    title: new FormControl("", [Validators.required]),
    imageURL: new FormControl("", [Validators.required]), 
    content: new FormControl("", [Validators.required])
  });

  //Form Data
  get title() {
    return this.createABlogForm.get("title");
  }
  get imageURL() {
    return this.createABlogForm.get("imageURL");
  }
  get content() {
    return this.createABlogForm.get("content");
  }

  ngOnInit() {}

  createBlog() {
    this.createdBlog = {
      BlogID: null,
      Content: this.content.value,
      FeaturedImage: this.imageURL.value,
      Title: this.title.value,
      UserID: null,
      lastMod: null,
      projectID: null,
      publishDate: null
    };
    this.syg.createBlog(this.createdBlog);
  }
}
