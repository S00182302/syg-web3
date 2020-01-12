import { Component, OnInit } from "@angular/core";
import { SYGDatabaseService } from "src/app/service/sygdatabase.service";
import { HttpClient, HttpEventType } from "@angular/common/http";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Activity } from "../../models/activity";

import { Router } from "@angular/router";

@Component({
  selector: "app-create-activity",
  templateUrl: "./create-activity.component.html",
  styleUrls: ["./create-activity.component.css"]
})
export class CreateActivityComponent implements OnInit {
  selectedFile: File;
  filename: string; 
  activityItem: Activity;

  activityForm = new FormGroup({
    title: new FormControl("", [Validators.required]),
    //imageURL: new FormControl("", [Validators.required]),
    content: new FormControl("", [Validators.required])
  });

  constructor(
    private svc: SYGDatabaseService,
    private http: HttpClient,
    public router: Router
  ) {}

  ngOnInit() {}

  onFileChanged(event) {
    const file = event.target.files[0];
    this.selectedFile = file;
  }

  onUpload() {
    const uploadData = new FormData();
    uploadData.append("fileToUpload", this.selectedFile, this.filename); //this.selectedFile.name);
    this.http
      .post("https:bretthenning.com/svg/upload.php", uploadData, {
        reportProgress: true,
        observe: "events"
      })
      .subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          console.log(
            "Upload Progress:  " +
              Math.round((event.loaded / event.total) * 100) +
              "%"
          );
        } else if (event.type === HttpEventType.Response) {
          if (event.ok) {
            // create database entry upload was successful
            this.activityItem = {
              name: this.title.value,
              description: this.content.value,
              imageUrl: "https://bretthenning.com/svg/uploads/" + this.filename,
              lastmod: new Date()
            };

            this.svc.createActivity(this.activityItem);
          }
        }
      });
  }

  createActivity() {
    this.filename =
      new Date().getTime().toString() +
      this.selectedFile.name.substr(this.selectedFile.name.lastIndexOf("."));
    console.log(this.filename);
    this.onUpload();
  }

  //Form Data
  get title() {
    return this.activityForm.get("title");
  }
  //get imageURL() { return this.activityForm.get("imageURL"); }
  get content() {
    return this.activityForm.get("content");
  }
}
