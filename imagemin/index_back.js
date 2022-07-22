/*
 * @Description: 文件描述
 * @Author: zhangjie
 * @Date: 2022-07-22 10:47:45
 * @LastEditors: zhangjie
 * @LastEditTime: 2022-07-22 11:17:36
 * @FilePath: \imagemin\index.js
 */

import imagemin from 'imagemin';
import imageminJpegtran from 'imagemin-jpegtran';
import imageminPngquant from 'imagemin-pngquant';
// (async () => {
 const files = await imagemin(['images/*.{jpg,png}'], {
		destination: 'images_min',
		plugins: [
			imageminJpegtran(),
			imageminPngquant({
				quality: [0.6, 0.8]
			})
		]
 });
 
 console.log(files);
 //=> [{data: <Buffer 89 50 4e …>, destinationPath: 'build/images/foo.jpg'}, …]
// })();