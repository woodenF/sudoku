const matrixToolkit = {
    makeRow(v = 0) {
        const array = new Array(9);
        array.fill(v);
        return array;
    },
    makeMatrix(v = 0) {
        return Array.from({ length: 9})
                    .map(() => this.makeRow(v));
    },
    /**
     * 随机打乱数组
     * @param {*} array 
     */
    shuffle(array) {
        const endIndex = array.length - 2;
        for(let i = 0; i <= endIndex; i++) {
            const j = i + Math.floor(Math.random() * (array.length - i));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    },
    /**
     * 检查指定位置是否可以填写数字
     * @param {*} matrix 当前数组矩阵 
     * @param {*} n 待填写的数字
     * @param {*} rowIndex 横向坐标
     * @param {*} colIndex 纵向坐标
     */
    checkFillable(matrix, n, rowIndex, colIndex) {
        const row = matrix[rowIndex];
        const column = this.makeRow().map((v, i) => matrix[i][colIndex]);
        const { boxIndex } = boxToolkit.converToBoxIndex(rowIndex, colIndex);
        const box = boxToolkit.getBoxCells(matrix, boxIndex);
        for(let i = 0; i < 9; i++) {
            if(row[i] === n
                || column[i] === n
                || box[i] === n) {
                    return false;
            }
        }
        return true;
    }
}
const boxToolkit = {
    /**
     * 将横纵坐标转换为宫坐标
     * @param {*} rowIndex 
     * @param {*} colIndex 
     */
    converToBoxIndex(rowIndex, colIndex) {
        return {
            boxIndex: Math.floor(rowIndex / 3) * 3 + Math.floor(colIndex / 3),
            cellIndex: rowIndex % 3 * 3 + colIndex % 3
        }
    },
    /**
     * 获得宫数据
     * @param {*} matrix 
     * @param {*} boxIndex 
     */
    getBoxCells(matrix, boxIndex) {
        const startRowIndex = Math.floor(boxIndex / 3) * 3;
        const startColIndex = boxIndex % 3 * 3;
        const result = [];
        for(let cellIndex = 0; cellIndex < 9; cellIndex++) {
            const rowIndex = startRowIndex + Math.floor(cellIndex / 3);
            const colIndex = startColIndex + cellIndex % 3;
            result.push(matrix[rowIndex][colIndex]);
        }
        return result;
    }
}
export default class Toolkit {
    static get matrix() {
        return matrixToolkit;
    }
    static get box() {
        return boxToolkit;
    }
}
