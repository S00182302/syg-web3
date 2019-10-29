import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  folder: string = "assets/images/";
  socialItems: any[] = [
    {
      "image": this.folder+"youtube.png",
      "alt": "Youtube social link",
      "link": "https://youtube.com"
    },
    {
      "image": this.folder+"facebook.png",
      "alt": "Facebook social link",
      "link": "https://facebook.com"
    },
    {
      "image": this.folder+"pintrest.png",
      "alt": "Pinterest link",
      "link": "https://pinterest.com"
    },
    {
      "image": this.folder+"twitter.png",
      "alt": "Twitter social link",
      "link": "https://twitter.com"
    },
    {
      "image": this.folder+"instagram.png",
      "alt": "Instagram social link",
      "link": "https://instagram.com"
    }
  ]

  constructor() { 
    
  }

  ngOnInit() {
  }

}
