export function getMergeSortAnimations(array) {
    const animations = [];
    if (array.length <= 1) return array;
    const auxiliaryArray = array.slice();
    mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);
    return animations;
  }
  
  function mergeSortHelper(
    mainArray,
    startIdx,
    endIdx,
    auxiliaryArray,
    animations,
  ) {
    if (startIdx === endIdx) return;
    const middleIdx = Math.floor((startIdx + endIdx) / 2);
    mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
    mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations);
    doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
  }
  
  function doMerge(
    mainArray,
    startIdx,
    middleIdx,
    endIdx,
    auxiliaryArray,
    animations,
  ) {
    let k = startIdx;
    let i = startIdx;
    let j = middleIdx + 1;
    while (i <= middleIdx && j <= endIdx) {
      // These are the values that we're comparing; we push them once
      // to change their color.
      animations.push([i, j]);
      // These are the values that we're comparing; we push them a second
      // time to revert their color.
      animations.push([i, j]);
      if (auxiliaryArray[i] <= auxiliaryArray[j]) {
        // We overwrite the value at index k in the original array with the
        // value at index i in the auxiliary array.
        animations.push([k, auxiliaryArray[i]]);
        mainArray[k++] = auxiliaryArray[i++];
      } else {
        // We overwrite the value at index k in the original array with the
        // value at index j in the auxiliary array.
        animations.push([k, auxiliaryArray[j]]);
        mainArray[k++] = auxiliaryArray[j++];
      }
    }
    while (i <= middleIdx) {
      // These are the values that we're comparing; we push them once
      // to change their color.
      animations.push([i, i]);
      // These are the values that we're comparing; we push them a second
      // time to revert their color.
      animations.push([i, i]);
      // We overwrite the value at index k in the original array with the
      // value at index i in the auxiliary array.
      animations.push([k, auxiliaryArray[i]]);
      mainArray[k++] = auxiliaryArray[i++];
    }
    while (j <= endIdx) {
      // These are the values that we're comparing; we push them once
      // to change their color.
      animations.push([j, j]);
      // These are the values that we're comparing; we push them a second
      // time to revert their color.
      animations.push([j, j]);
      // We overwrite the value at index k in the original array with the
      // value at index j in the auxiliary array.
      animations.push([k, auxiliaryArray[j]]);
      mainArray[k++] = auxiliaryArray[j++];
    }
  }

  export function getSelectionSortAnimations(array) {
    const animations = [];
    const auxArray = array.slice();

    for (let i = 0; i < auxArray.length - 1; i++) {
        let minIdx = i;
        for (let j = i + 1; j < auxArray.length; j++) {
            // Compare elements at j and minIdx
            animations.push([j, minIdx, 'compare']);
            animations.push([j, minIdx, 'revert']);

            if (auxArray[j] < auxArray[minIdx]) {
                minIdx = j;
            }
        }
        if (minIdx !== i) {
            // Swap elements at i and minIdx
            animations.push([i, auxArray[minIdx], 'swap']);
            animations.push([minIdx, auxArray[i], 'swap']);
            [auxArray[i], auxArray[minIdx]] = [auxArray[minIdx], auxArray[i]];
        }
    }

    return animations;
}


export function getBubbleSortAnimations(array) {
    const animations = [];
    const auxArray = array.slice();

    for (let i = 0; i < auxArray.length - 1; i++) {
        for (let j = 0; j < auxArray.length - i - 1; j++) {
            // Compare elements at j and j+1
            animations.push([j, j + 1, 'compare']);
            animations.push([j, j + 1, 'revert']);

            if (auxArray[j] > auxArray[j + 1]) {
                // Swap elements at j and j+1
                animations.push([j, auxArray[j + 1], 'swap']);
                animations.push([j + 1, auxArray[j], 'swap']);
                [auxArray[j], auxArray[j + 1]] = [auxArray[j + 1], auxArray[j]];
            }
        }
    }

    return animations;
}



export function getInsertionSortAnimations(array) {
    const animations = [];
    const auxArray = array.slice();

    for (let i = 1; i < auxArray.length; i++) {
        let j = i;
        while (j > 0 && auxArray[j] < auxArray[j - 1]) {
            // Compare elements at j and j-1
            animations.push([j, j - 1, 'compare']);
            animations.push([j, j - 1, 'revert']);

            // Swap elements at j and j-1
            animations.push([j, auxArray[j - 1], 'swap']);
            animations.push([j - 1, auxArray[j], 'swap']);
            [auxArray[j], auxArray[j - 1]] = [auxArray[j - 1], auxArray[j]];
            j--;
        }
    }

    return animations;
}