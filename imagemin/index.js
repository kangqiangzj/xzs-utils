/*
 * @Description: 文件描述
 * @Author: zhangjie
 * @Date: 2022-07-22 10:47:45
 * @LastEditors: zhangjie
 * @LastEditTime: 2022-07-22 15:19:04
 * @FilePath: \imagemin\index_back.js
 */
import imagemin from 'imagemin';
import imageminJpegtran from 'imagemin-jpegtran';
import imageminMozjpeg from 'imagemin-Mozjpeg';
import imageminPngquant from 'imagemin-pngquant';

import * as fs from 'fs';
import * as path from 'path';

function getFileDirectory(_pathName) {
	let fileData = fs.readdirSync(_pathName);
	console.log("fileData",fileData)
	if (fileData) {
		for (let i = 0, j = fileData.length; i < j; i++) {
			let tempPath = path.join(_pathName, fileData[i]);
			let fileState = fs.statSync(tempPath);
			if (fileState.isDirectory()) {
				sourPathArray.push(tempPath);
				getFileDirectory(tempPath);
			}
		}
	}
}

//路径下获取对应得文件夹路径
let sourPathArray = [];
let sourcePath = process.argv[2];
let rootId = 0;
if (fs.statSync(sourcePath).isDirectory()) {
	sourPathArray.push(sourcePath);
	getFileDirectory(sourcePath);

	//获取路径目录index
	let tempArray = sourcePath.split(path.sep);
	rootId = tempArray.length - 1;
}
else {
	console.log('缺少路径参数或非法路径!');
}


//按照存储路径结构生成对应得文件夹
let newName = '_min';
let desPathArray = [];
for (let i = 0, j = sourPathArray.length; i < j; i++) {
	let tepmArray = sourPathArray[i].split(path.sep);
	tepmArray[rootId] = tepmArray[rootId] + newName;

	let destPath = tepmArray.join(path.sep);
	fs.mkdirSync(destPath, { recursive: true });
	desPathArray.push(destPath);
}
//压缩图片
sourPathArray.forEach(async (value, index) => {
	// let originPath = 'C:/Users/zhangjie/Desktop/images/*.{jpg,png}'
	// console.log("value",value)
	// console.log('path',path.join(value, '/*.{jpg,png}'))
	// console.log('des',desPathArray[index])

	const files = await imagemin([value + '/*.{jpg,png}'], {
		destination: desPathArray[index],
		plugins: [
			imageminMozjpeg(),
			imageminJpegtran(),
			imageminPngquant({
				quality: [0.6, 0.8]
			})
		]
	});
	console.log(files);
})