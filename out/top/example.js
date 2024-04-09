import { FIR } from './TSSV/out/src/modules/FIR.js';
import { writeFileSync, mkdirSync } from 'fs';
try {
    mkdirSync('verilog/');
}
catch (e) { }
const myFir = new FIR({ name: 'myFIR', numTaps: 4, coefficients: [1n, 2n, 3n, 4n] });
try {
    writeFileSync('verilog/myFIR.sv', myFir.writeSystemVerilog());
}
catch (err) {
    console.error(err);
}
const myFir2 = new FIR({ numTaps: 5, coefficients: [2n, -2n, 4n, -4n, 8n] });
try {
    writeFileSync(`verilog/${myFir2.name}.sv`, myFir2.writeSystemVerilog());
}
catch (err) {
    console.error(err);
}
