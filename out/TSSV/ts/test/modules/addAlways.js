// import library
import { Module } from 'tssv/lib/core/TSSV';
export class addAlways extends Module {
    constructor(params) {
        super({
            // define the default parameter values
            name: params.name,
            data_Width: params.data_Width || 8
        });
        // define IO signals
        this.IOs = {
            clk: { direction: 'input', type: 'wire', isClock: 'posedge' },
            rst_b: { direction: 'input', type: 'wire', isReset: 'lowasync' },
            en: { direction: 'input', type: 'wire' },
            data_in: { direction: 'input', type: 'wire', width: this.params.data_Width },
            data_out: { direction: 'output', type: 'wire', width: this.params.data_Width },
            a: { direction: 'input', type: 'wire' },
            b: { direction: 'input', type: 'wire' },
            c: { direction: 'output', type: 'logic' }
        };
        // always_ff test
        // exclude sensitivityList
        const seq_body1 = `
        begin
          ${'data_out'} <= ${'data_in'};  
        end \n
        `;
        this.addSequentialAlways({ clk: 'clk', reset: 'rst_b', outputs: ['data_out'] }, seq_body1);
        // include correct sensitivityList
        const seq_body2 = `
        always_ff @( posedge clk or negedge rst_b )
            begin
              ${'data_out'} <= ${'data_in'};  
            end
        `;
        this.addSequentialAlways({ clk: 'clk', reset: 'rst_b', outputs: ['data_out'] }, seq_body2);
        // always_comb test
        // exclude sensitivityList
        const comb_body1 = `            begin
              c = a & b;  
            end
        `;
        this.addCombAlways({ inputs: ['a', 'b'], outputs: ['c'] }, comb_body1);
        // include correct sensitivityList
        const comb_body2 = `
        always @( a or b )
            begin
              c = a & b;  
            end
        `;
        this.addCombAlways({ inputs: ['a', 'b'], outputs: ['c'] }, comb_body2);
    }
}
