import request from 'superagent';
import { push } from 'redux-router';
import { ROOT_URL, ROOT_IMAGE_URL } from '../config';
import { AUTH_TOKEN } from './auth_action';

export function UploadEditorPublicImage(imgObj, randID) {
  var req = request
              .post(`${ROOT_URL}/api/secure/upload/public_image`)
              .set('Authorization', localStorage.getItem(AUTH_TOKEN))

  var img = imgObj.data.file
  req.attach(img.name, img);
  req.field('imageName', img.name);
  req.field('imageID', randID);

  return dispatch => {
    return req.end((err, res) => {
      if(res.status === 200) {
        imgObj.data.el.$.src = `${ROOT_IMAGE_URL}/${res.text}`
      }
      else {
        console.log(err);
      }
    })
  }
  
}
