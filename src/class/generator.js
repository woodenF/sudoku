import Toolkit from '../util/util';

export default class Generator {
    generate() {
        // while(!this.internalGenerate()) {
        //     console.log('try again');
        // }
        this.internalGenerate()
        this.blankNumber(0);
        return this.matrix;
    }
    internalGenerate() {
        this.matrix = Toolkit.matrix.makeMatrix();
        this.orders = Toolkit.matrix.makeMatrix()
                                    .map(row => row.map((v, i) => i))
                                    .map(row => Toolkit.matrix.shuffle(row));
        for(let n = 1; n <= 9; n++) {
            if(!this.fillNumber(n)) {
                return false;
            }
        }
        return true;
    }
    fillNumber(n) {
        return this.fillRow(n, 0);
    }
    fillRow(n, rowIndex) {
        if(rowIndex > 8) return true;
        const row = this.matrix[rowIndex];
        const orders = this.orders[rowIndex];
        for(let i = 0; i < 9; i++) {
            const colIndex = orders[i];
            if(row[colIndex]) {
                continue;
            }
            if(!Toolkit.matrix.checkFillable(this.matrix, n, rowIndex, colIndex)) {
                continue;
            }
            row[colIndex] = n;
            if(!this.fillRow(n, rowIndex + 1)) {
                row[colIndex] = 0;
                continue;
            }
            return true;
        }
        return false;
    }
    blankNumber(rowIndex) {
        if(rowIndex > 8) return;
        const MIN_NUMBER = 5;
        const MAX_NUMBER = 8;
        let number = Math.floor(MIN_NUMBER + Math.random() * (MAX_NUMBER - MIN_NUMBER));
        let temp = Toolkit.matrix.shuffle(Array.from({ length: 9})
                        .map((v, i) => i))
        console.log(temp)
        Array.from({ length: number })
            .map(() => {
                const random = Math.random() * temp.length >> 0;
                const blank = temp[random];
                temp.splice(random, 1);
                return blank;
            })
            .map((item) => {
                this.matrix[rowIndex][item] = '';
            })
        this.blankNumber(rowIndex + 1);
    }
}