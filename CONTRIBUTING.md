# Contribution Guide

## Issue
* Please only post bug-related content in the issue. Please use '[https://jsdev.kr/c/axisj/](https://jsdev.kr/c/axisj/)' to ask questions about usage. 
* Please search and register if you already have the issue you want to create. If you have a similar issue, you can add additional comments.
* Please write the issue in detail and concise.
	* If necessary, you can capture screens and upload images.

## Pull request(PR)
* Do not change the dist folder. (Used for npm deployments.)

## Coding Guidelines
Coding conventions should be followed when contributing code.

* The charset in all text files is UTF-8 without a BOM.
* Indentation is two spaces.
* `const onResetColumns = function () {` , 
`if () {` `for ( let c = 0, cl = row.cols.length; c < cl; c++ ) {`,
`public static setFormatter( _formatter: any ): any {`,
`return GridRoot.setFormatter( _formatter );`
Please keep the space as shown.

* **Even if you find a code that does not fit the coding convention, never modify the code that is not related to the purpose.**