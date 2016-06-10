import { Mongo } from 'meteor/mongo';
//import { FS } from 'meteor/filesystem';

var imageStore = new FS.Store.FileSystem("images", {path: "~/uploads"});

Images = new FS.Collection("images", {
  stores: [imageStore]
  //stores: [new FS.Store.FileSystem("images", {path: "~/uploads"})]
});

