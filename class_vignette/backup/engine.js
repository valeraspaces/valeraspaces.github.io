//Рушійний фреймворк
//Розроблений Валерієм Обідцем (Astdov)
//Назва: Двигун для віньєтки Astdov
//Для розробки електронної віньєтки

class Transform {
	position = [0, 0, 0];
	rotation = [0, 0, 0];
	scale = [1, 1, 1];
	offset = [0, 0, 0];
}
const Mathf = {
	intersectionLines2(firstLine, secondLine, firstLineInfinity = [false, false], secondLineInfinity = [false, false]) {
		const [[[Ax, Ay], [Bx, By]], [[Cx, Cy], [Dx, Dy]]] = [firstLine, secondLine];
		const denominator = (Bx - Ax) * (Dy - Cy) - (By - Ay) * (Dx - Cx);
		
		if (denominator === 0) return [NaN, NaN];
		
		const [t, u] = [((Ax - Cx) * (Dy - Cy) - (Ay - Cy) * (Dx - Cx)) / denominator, -((Ax - Cx) * (By - Ay) - (Ay - Cy) * (Bx - Ax)) / denominator];
		const [[AUnlim, BUnlim], [CUnlim, DUnlim]] = [firstLineInfinity, secondLineInfinity];
		return (t >= 0 || AUnlim) && (t <= 1 || BUnlim) && (u >= 0 || CUnlim) && (u <= 1 || DUnlim) ? [Ax + t * (Bx - Ax), Ay + t * (By - Ay)] : [NaN, NaN];
	},
	rotateByDirection2(A, rotationDirection) {
		return [A[0] * rotationDirection[0] - A[1] * rotationDirection[1], A[0] * rotationDirection[1] + A[1] * rotationDirection[0]];
	},
	rotateByDirection3(A, rotationDirectionYZ, rotationDirectionXZ, rotationDirectionXY) {
		let B = [
			A[0],
			A[1] * rotationDirectionYZ[0] - A[2] * rotationDirectionYZ[1],
			A[1] * rotationDirectionYZ[1] + A[2] * rotationDirectionYZ[0]
		];
		B = [
			B[0] * rotationDirectionXZ[0] - B[2] * rotationDirectionXZ[1],
			B[1],
			B[0] * rotationDirectionXZ[1] + B[2] * rotationDirectionXZ[0]
		];
		B = [
			B[0] * rotationDirectionXY[0] - B[1] * rotationDirectionXY[1],
			B[0] * rotationDirectionXY[1] + B[1] * rotationDirectionXY[0],
			B[2]
		];
		return B;
	},
	rotate2(A, angle) {
		const rotationDirection = [Math.cos(angle), Math.sin(angle)];
		return Mathf.rotateByDirection2(A, rotationDirection);
	},
	makeDirectionByEulerRotation(rotation) {
		let result = [];
		for (let angle of rotation) {
			result.push([Math.cos(angle), Math.sin(angle)]);
		}
		return result;
	},
	rotate3(A, rotation) {
		const [rotationDirectionYZ, rotationDirectionXZ, rotationDirectionXY] = [[Math.cos(rotation[0]), Math.sin(rotation[0])], [Math.cos(rotation[1]), Math.sin(rotation[1])], [Math.cos(rotation[2]), Math.sin(rotation[2])]];
		return Mathf.rotateByDirection3(A, rotationDirectionYZ, rotationDirectionXZ, rotationDirectionXY);
	},
	vectorsMultipleCoords() {
		let result = [];
		for (let vector of arguments) {
			for (let coordIndex in vector) {
				const coord = vector[coordIndex];
				if (result[coordIndex] == undefined || result[coordIndex] == null) result[coordIndex] = 1;
				result[coordIndex] *= coord;
			}
		}
		return result;
	},
	vectorsAddCoords() {
		let result = [];
		for (let vector of arguments) {
			for (let coordIndex in vector) {
				const coord = vector[coordIndex];
				if (result[coordIndex] == undefined || result[coordIndex] == null) result[coordIndex] = 0;
				result[coordIndex] += coord;
			}
		}
		return result;
	},
	vectorsSubtractionCoords() {
		let result = [];
		let firstVector = true;
		for (let vector of arguments) {
			if (firstVector) {
				result = vector;
				firstVector = false;
				continue;
			}
			for (let coordIndex in vector) {
				const coord = vector[coordIndex];
				if (result[coordIndex] == undefined || result[coordIndex] == null) result[coordIndex] = 0;
				result[coordIndex] -= coord;
			}
		}
		return result;
	},
	vectorsFastSubtractionCoords2(A, B) {
	  return [A[0] - B[0], A[1] - B[1]];
	},
	vectorsFastSubtractionCoords3(A, B) {
	  return [A[0] - B[0], A[1] - B[1], A[2] - B[2]];
	},
	vectorsDevideCoords() {
		let result = [];
		let firstVector = true;
		for (let vector of arguments) {
			if (firstVector) {
				result = vector;
				firstVector = false;
				continue;
			}
			for (let coordIndex in vector) {
				const coord = vector[coordIndex];
				if (result[coordIndex] == undefined || result[coordIndex] == null) result[coordIndex] = 0;
				result[coordIndex] /= coord;
			}
		}
		return result;
	},
	vectorsDotProduction() {
	  let result = [];
	  let sum = 0;
	  for (let vector of arguments) {
	    for (let coordIndex in vector) {
	      if (result[coordIndex] == undefined) result[coordIndex] = 1;
	      result[coordIndex] *= vector[coordIndex];
	    }
	  }
	  for (let coord of result) {
	    sum += coord;
	  }
	  return sum;
	},
	fastVectorsDotProduction2(A, B) {
	  return A[0] * B[0] + A[1] * B[1];
	},
	fastVectorsDotProduction3(A, B) {
    return A[0] * B[0] + A[1] * B[1] + A[2] * B[2];
	},
	fastVectorsCrossProduction3(A, B) {
	  return [A[1] * B[2] - A[2] * B[1], A[2] * B[0] - A[0] * B[2], A[0] * B[1] - A[1] * B[0]];
	},
	fastVectorsCrossProduction2Z(A, B) {
	  return A[0] * B[1] - A[1] * B[0];
	},
	linearInterpolation(A, B, x) {
		return (A[1] * (B[0] - x) + B[1] * (x - A[0])) / (B[0] - A[0]);
	},
	bilinearInterpolation(A, B, C, D, P) {
		const averageAngleCoef = (B[1] - A[1]) / (B[0] - A[0]) + (D[1] - C[1]) / (D[0] - C[0]);
		if (averageAngleCoef <= 1 && averageAngleCoef >= -1) {
			const [linearInterpolationABz, linearInterpolationCDz] = [Mathf.linearInterpolation([A[0], A[2]], [B[0], B[2]], P[0]), Mathf.linearInterpolation([C[0], C[2]], [D[0], D[2]], P[0])];
			const [linearInterpolationABy, linearInterpolationCDy] = [Mathf.linearInterpolation([A[0], A[1]], [B[0], B[1]], P[0]), Mathf.linearInterpolation([C[0], C[1]], [D[0], D[1]], P[0])];
			return Mathf.linearInterpolation([linearInterpolationABy, linearInterpolationABz], [linearInterpolationCDy, linearInterpolationCDz], P[1]);
		}
		else {
			const [linearInterpolationABz, linearInterpolationCDz] = [Mathf.linearInterpolation([A[1], A[2]], [B[1], B[2]], P[1]), Mathf.linearInterpolation([C[1], C[2]], [D[1], D[2]], P[1])];
			const [linearInterpolationABx, linearInterpolationCDx] = [Mathf.linearInterpolation([A[1], A[0]], [B[1], B[0]], P[1]), Mathf.linearInterpolation([C[1], C[0]], [D[1], D[0]], P[1])];
			return Mathf.linearInterpolation([linearInterpolationABx, linearInterpolationABz], [linearInterpolationCDx, linearInterpolationCDz], P[0]);
		}
	},
	distance() {
	  let result = 0;
	  for (let vectorIndex in arguments) {
	    if (vectorIndex == 0) continue;
	    const vector = arguments[vector];
	    const prevVector = arguments[Number(vector) - 1]
	    let calculatedDistanceBetwenVectors = 0;
	    for (let coordIndex in vector) {
	      calculatedDistanceBetwenVectors += Math.pow(vector[coordIndex] - prevVector[coordIndex], 2);
	    }
	    calculatedDistanceBetwenVectors = Math.sqrt(calculatedDistanceBetwenVectors);
	    result += calculatedDistanceBetwenVectors;
	  }
	},
	fastDistance2(A, B) {
	  return Math.sqrt(Math.pow(B[0] - A[0], 2) + Math.pow(B[1] - A[1], 2));
	},
	fastDistance3(A, B) {
	  return Math.sqrt(Math.pow(B[0] - A[0], 2) + Math.pow(B[1] - A[1], 2) + Math.pow(B[2] - A[2], 2));
	}
};
class WorldObject {
	transform = new Transform();
}
class Scene {
	objects = [];
}
class Texture {
	color = new Uint8Array(4);
	wireframe = false;
	wireframeColor = new Uint8Array(4);
	sideVisible = true;
	zFade = true;
	zFadeCoeficient = 10;
	zFadeColor = [0, 0, 0, 255];
	
	constructor(data = new Uint8Array(0), width = 0, height = 0) {
		this.data = data;
		this.width = width;
		this.height = height;
		for (let channelIndex = 0; channelIndex < 4; channelIndex++) {
			this.color[channelIndex] = 255;
		}
	}
}
class Geometry {
	lines = [];
	uv = [];
	linesHeight = [];
	linesAngleX = [];
	texture = new Texture();
	twoSideDrawing = false;
	normalDirection = 1;
}
class Renderer {	
	screenSize = [640, 480];
	aspectRatio = 4 / 3;
	cameraScale = [1, 1];
	projectionRatio = [1, 1];
	fieldOfView = [Math.PI / 2, Math.PI / 2];
	cameraAspectRatioScaling = "auto";
	orthographic = false;
	context = null;
	
	constructor(scene, camera) {
		this.camera = camera;
		this.scene = scene;
	}
	
	updateConstants() {
		this.orthographic = this.fieldOfView == 0;
		let projectionFOVRatio = [Math.tan(this.fieldOfView[0] / 2)];
		projectionFOVRatio[1] = this.fieldOfView[0] === this.fieldOfView[1] ? projectionFOVRatio[0] : Math.tan(this.fieldOfView[1] / 2);
		let scaleAspectRatio;
		switch (this.cameraAspectRatioScaling.toLowerCase()) {
			case "auto":
				const isWide = this.aspectRatio >= 1;
				scaleAspectRatio = isWide ? [1 / this.aspectRatio, 1] : [1, this.aspectRatio];
				break;
			
			case "horizontal":
				scaleAspectRatio = [1 / this.aspectRatio, 1];
				break;
			
			case "vertical":
				scaleAspectRatio = [1, this.aspectRatio];
				break;
				
			default:
				scaleAspectRatio = [1, 1];
				break;
		}
		this.projectionRatio = [scaleAspectRatio[0] / ((this.orthographic ? 1 : projectionFOVRatio[0]) * this.cameraScale[0]), scaleAspectRatio[1] / ((this.orthographic ? 1 : projectionFOVRatio[1]) * this.cameraScale[1])];
	}
	
	projectToScreen(A) {
		return this.orthographic ? [A[0] * this.projectionRatio[0], A[1] * this.projectionRatio[1, A[2]]] : [A[0] * this.projectionRatio[0] / A[2], A[1] * this.projectionRatio[1] / A[2], A[2]];
	}
	projectToWorld(A) {
	  return this.orthographic ? [A[0] / this.projectionRatio[0], A[1] / this.projectionRatio[1, A[2]], A[2]] : [A[0] / this.projectionRatio[0] * A[2], A[1] / this.projectionRatio[1] * A[2], A[2]];
	}
	
	zBuffer = new Uint16Array(0);
	buffer = new Uint8Array(0);
	
	setBufferPixel(x, y, deepth, color) {
	  if (color[3] <= 0) return;
		const index = (Math.floor(y) * this.screenSize[0] + Math.floor(x)) * 4;
		const zBufferIndex = index / 4;
		const zBufferValue = this.zBuffer[zBufferIndex];
		const isFront = deepth < zBufferValue || Number.isNaN(deepth);
		if (isFront) {
		  for (let i = 0; i < 4; i++) {
  			this.buffer[index + i] = color[i];
  		}
  		this.zBuffer[zBufferIndex] = deepth;
		}
	}
	setPixel(x, y, color) {
	  const index = (Math.round(y) * this.screenSize[0] + Math.round(x)) * 4;
	  for (let i = 0; i < 4; i++) {
	    this.buffer[index + i] = color[i];
	  }
	}
	drawLine(A, B, color = [0, 0, 0, 255]) {
	  const [xLength, yLength] = [B[0] - A[0], B[1] - A[1]];
	  const zDefined = !Number.isNaN(A[2] + B[2]);
	  if (xLength == 0 && yLength == 0) return;
	  const k = yLength / xLength;
	  const [xDirection, yDirection] = [Math.sign(xLength), Math.sign(yLength)];
	  const [ALim, BLim] = [
		[Math.min(Math.max(A[0], 0), this.screenSize[0]), Math.min(Math.max(A[1], 0), this.screenSize[1])],
		[Math.min(Math.max(B[0], 0), this.screenSize[0]), Math.min(Math.max(B[1], 0), this.screenSize[1])]
	  ];
	  if (Math.abs(k) > 1) for (let y = ALim[1]; yDirection < 0 ? y >= BLim[1] : y <= BLim[1]; y += yDirection) {
	    const x = Mathf.linearInterpolation([A[1], A[0]], [B[1], B[0]], y);
	    const z = zDefined ? Mathf.linearInterpolation([A[1], A[2]], [B[1], B[2]], y) : NaN;
	    this.setBufferPixel(x, y, z, color);
	  }
	  else for (let x = ALim[0]; xDirection < 0 ? x >= BLim[0] : x <= BLim[0]; x += xDirection) {
	    const y = Mathf.linearInterpolation(A, B, x);
	    const z = zDefined ? Mathf.linearInterpolation([A[0], A[2]], [B[0], B[2]], x) : NaN;
	    this.setBufferPixel(x, y, z, color);
	  }
	}
	drawPoly(poly, uv = [[0, 0], [0, 0], [0, 0], [0, 0]], geometryColor = [255, 255, 255, 255], texture = undefined, normalDirection = 1, twoSideDrawing = true) {
		let [topLimit, bottomLimit, leftLimit, rightLimit, backLimit, forwardLimit] = [Infinity, -Infinity, Infinity, -Infinity, Infinity, -Infinity];
		for (let vertex of poly) {
			[topLimit, bottomLimit, leftLimit, rightLimit, backLimit, forwardLimit] = [Math.min(topLimit, vertex[1]), Math.max(bottomLimit, vertex[1]), Math.min(leftLimit, vertex[0]), Math.max(rightLimit, vertex[0]), Math.min(backLimit, vertex[2]), Math.max(forwardLimit, vertex[2])];
		}
		const normalDirectionZ = Mathf.fastVectorsCrossProduction2Z(Mathf.vectorsFastSubtractionCoords2(poly[1], poly[0]), Mathf.vectorsFastSubtractionCoords2(poly[2], poly[0]));
		const normalLookAtCamera = normalDirectionZ * Math.sign(normalDirection) >= 0;
		const isLookAtCamera = twoSideDrawing || normalLookAtCamera;
		if (!isLookAtCamera) return;
		const [topLimitNormalized, bottomLimitNormalized, leftLimitNormalized, rightLimitNormalized] = [...Mathf.vectorsDevideCoords([topLimit, bottomLimit], [this.screenSize[1]]), Mathf.vectorsDevideCoords([leftLimit, rightLimit], this.screenSize[0])];
		if (forwardLimit <= 0 || topLimitNormalized >= 1 || bottomLimitNormalized < 0 || leftLimitNormalized >= 1 || rightLimitNormalized < 0) return;
		const vertexIndexName = [0, 1, 3, 2];
		const isTextureDefined = texture instanceof Texture && texture.data.length > 0;
		if (texture.sideVisible) for (let yScreen = Math.max(topLimit, 0); yScreen <= Math.min(bottomLimit, this.screenSize[1] - 1); yScreen++) {
		  xPixelIteration: for (let xScreen = Math.max(leftLimit, 0); xScreen <= Math.min(rightLimit, this.screenSize[0] - 1); xScreen++) {
		    const pixelVector = [xScreen, yScreen];
		    for (let i in vertexIndexName) {
				const vertexIndex = vertexIndexName[i];
				let lastVertex;
				if (vertexIndex > 0) lastVertex = poly[vertexIndexName[i - 1]];
				else lastVertex = poly[vertexIndexName[vertexIndexName.length - 1]];
				const vertex = poly[vertexIndex];
				const [A, B] = [Mathf.vectorsFastSubtractionCoords2(vertex, lastVertex), Mathf.vectorsFastSubtractionCoords2(pixelVector, lastVertex)];
				const cross = Mathf.fastVectorsCrossProduction2Z(A, B);
				if (cross * (twoSideDrawing ? Math.sign(normalDirectionZ) : 1) * Math.sign(normalDirection) < 0) continue xPixelIteration;
		    }
		    const z = Mathf.bilinearInterpolation(...poly, pixelVector);
		    if (z <= 0) continue;
			let color = [];
			if (isTextureDefined) { //NOTE: Визначення позиції UV пікселя та його колір відповідно текстурі
				let polyZAsUVVertical = [];
				let polyZAsUVHorizontal = [];
				for (let vertexIndex in poly) {
					const vertex = poly[vertexIndex];
					const uvVertex = uv[vertexIndex];
					const vertex2 = [vertex[0], vertex[1]];
					const [vertexUAsZ, vertexVAsZ] = [[...vertex2, uvVertex[0]], [...vertex2, uvVertex[1]]];
					polyZAsUVHorizontal.push(vertexUAsZ);
					polyZAsUVVertical.push(vertexVAsZ);
				}
				const uvPosition = [
					Mathf.bilinearInterpolation(...polyZAsUVHorizontal, pixelVector),
					Mathf.bilinearInterpolation(...polyZAsUVVertical, pixelVector)
				];
				const positionOnTexture = Mathf.vectorsMultipleCoords(uvPosition, [texture.width, texture.height]);
				const pixelIndex = Math.floor(positionOnTexture[1]) * texture.width + Math.floor(positionOnTexture[0]);
				for (let i = 0; i < 4; i++) {
					color[i] = texture.data[pixelIndex * 4 + i] * geometryColor[i] / 255;
				}
			} else color = geometryColor;
			if (texture.zFade) {
				const colorFadePercent = [
					Math.min(Mathf.linearInterpolation([0, 255], [texture.zFadeCoeficient, texture.zFadeColor[0]], z) / 255, 1),
					Math.min(Mathf.linearInterpolation([0, 255], [texture.zFadeCoeficient, texture.zFadeColor[1]], z) / 255, 1),
					Math.min(Mathf.linearInterpolation([0, 255], [texture.zFadeCoeficient, texture.zFadeColor[2]], z) / 255, 1),
					Math.min(Mathf.linearInterpolation([0, 255], [texture.zFadeCoeficient, texture.zFadeColor[3]], z) / 255, 1)
				];
				color = Mathf.vectorsMultipleCoords(color, colorFadePercent);
			}
		    this.setBufferPixel(xScreen, yScreen, z, color);
		  }
		}
		if (texture.wireframe) for (let i in vertexIndexName) {
			const vertexIndex = vertexIndexName[i];
			let lastVertex;
			if (vertexIndex > 0) lastVertex = poly[vertexIndexName[i - 1]];
			else lastVertex = poly[vertexIndexName[vertexIndexName.length - 1]];
			const vertex = poly[vertexIndex];
			this.drawLine(lastVertex, vertex, texture.wireframeColor);
		}
	}
	
	rendering() {
		//const geometryRelativeToCamera = [];
		const cameraInverseRotationDirections = Mathf.makeDirectionByEulerRotation(Mathf.vectorsMultipleCoords(this.camera.transform.rotation, [-1, -1, -1]));
		const pixelsCount = this.screenSize[0] * this.screenSize[1];
		const imageData = new ImageData(...this.screenSize);
		this.buffer = imageData.data;
		this.zBuffer = new Array(pixelsCount);
		this.zBuffer.length = pixelsCount;
		//const maxZBufferValue = Math.pow(2, 16) - 1;
		for (let i = 0; i < this.zBuffer.length; i++) {
		  this.zBuffer[i] = Infinity;
		}

		const [leftClipingPlane, rightClipingPlane, bottomClipingPlane, topClipingPlane] = [this.projectToWorld([-0.5, 0, 1]), this.projectToWorld([0.5, 0, 1]), this.projectToWorld([0, -0.5, 1]), this.projectToWorld([0, 0.5, 1])];
		function transformAs2DProjection(A, axisArray) {
			return [A[axisArray[0]], A[axisArray[1]]];
		}
		
		for (let object of this.scene.objects) {
			const geometry = object.geometry;
			if (!(object instanceof WorldObject) || !(object.geometry instanceof Geometry)) continue;
			
			const transform = object.transform;
			const rotationDirection = Mathf.makeDirectionByEulerRotation(transform.rotation);
			const objectRelativePosition = Mathf.vectorsSubtractionCoords([...transform.position], [...this.camera.transform.position]);
			const texture = geometry.texture;
			
			//NOTE: створення віртуального полігону
			let relativeVirtualPolygons = [];
			lineIterator: for (let lineIndex in geometry.lines) {
				const line = geometry.lines[lineIndex];
				const [startHalfHeight, endHalfHeight] = Mathf.vectorsMultipleCoords(geometry.linesHeight[lineIndex], [0.5, 0.5]);
				const [startAngleX, endAngleX] = geometry.linesAngleX[lineIndex];
				
				//NOTE: переведення в координати відносно камери
				let newVirtualPoly = [
					Mathf.vectorsAddCoords(line[0], Mathf.rotate3([0, startHalfHeight, 0], [startAngleX, 0, 0])),
					Mathf.vectorsAddCoords(line[0], Mathf.rotate3([0, -startHalfHeight, 0], [startAngleX, 0, 0])),
					Mathf.vectorsAddCoords(line[1], Mathf.rotate3([0, endHalfHeight, 0], [endAngleX, 0, 0])),
					Mathf.vectorsAddCoords(line[1], Mathf.rotate3([0, -endHalfHeight, 0], [endAngleX, 0, 0]))
				];
				
				for (let vertexIndex in newVirtualPoly) {
					let vertex = newVirtualPoly[vertexIndex];
					vertex = Mathf.vectorsAddCoords(vertex, transform.offset);
					vertex = Mathf.vectorsMultipleCoords(vertex, transform.scale);
					vertex = Mathf.rotateByDirection3(vertex, ...rotationDirection);
					vertex = Mathf.vectorsAddCoords(vertex, objectRelativePosition);
					vertex = Mathf.rotateByDirection3(vertex, ...cameraInverseRotationDirections);
					newVirtualPoly[vertexIndex] = vertex;
				}
				
				//NOTE: відсікання, без обрізання та виключення
				let outScreenVertexIndexes = [];
				for (let vertexIndex in newVirtualPoly) {
					const vertex = newVirtualPoly[vertexIndex];
					let isOnScreen = true;
					for (let clippingPlane of [leftClipingPlane, Mathf.vectorsMultipleCoords(rightClipingPlane, [-1, -1, -1])]) {
						const clippingAxis = [0, 2];
						const isInFieldOfView = Mathf.fastVectorsCrossProduction2Z(transformAs2DProjection(clippingPlane, clippingAxis), transformAs2DProjection(vertex, clippingAxis)) < 0;
						if (!isInFieldOfView) isOnScreen = false;
					}
					for (let clippingPlane of [bottomClipingPlane, Mathf.vectorsMultipleCoords(topClipingPlane, [-1, -1, -1])]) {
						const clippingAxis = [1, 2];
						const isInFieldOfView = Mathf.fastVectorsCrossProduction2Z(transformAs2DProjection(clippingPlane, clippingAxis), transformAs2DProjection(vertex, clippingAxis)) < 0;
						if (!isInFieldOfView) isOnScreen = false;
					}
					if (!isOnScreen) outScreenVertexIndexes.push(parseInt(vertexIndex));
				}
				if (outScreenVertexIndexes.length >= 4) continue lineIterator;
				
				//NOTE: проекція
				const projectedVirtualPoly = [];
				for (let vertex of newVirtualPoly) {
					projectedVirtualPoly.push([...this.projectToScreen(vertex), vertex[2]]);
				}
				
				relativeVirtualPolygons.push(projectedVirtualPoly);
			}
			
			//NOTE: малювання
			for (let polyIndex in relativeVirtualPolygons) {
					const poly = relativeVirtualPolygons[polyIndex];
					if (poly == null) continue;
					const uv = geometry.uv[polyIndex];
					const twoSideDrawing = geometry.twoSideDrawing;
					const normalDirection = geometry.normalDirection;
					let modified = [];
					for (let vertex of poly) {
						modified.push(Mathf.vectorsMultipleCoords(Mathf.vectorsAddCoords(Mathf.vectorsMultipleCoords(vertex, [1, -1, 1]), [0.5, 0.5, 1]), this.screenSize));
					}
					this.drawPoly(modified, uv, texture.color, texture, normalDirection, twoSideDrawing);
				}
		}
		if (this.context instanceof CanvasRenderingContext2D) this.context.putImageData(imageData, 0, 0);
		/**for (let i = 0; i < imageData.data.length; i += 4) {
		  for (let j = 0; j < 3; j++) {
		    imageData.data[i + j] = 128 - this.zBuffer[i / 4] * 255 / 128;
		  }
		  imageData.data[i + 3] = 255;
		} //debug
		this.context.putImageData(imageData, 0, 0);**/ //debug
	}
}