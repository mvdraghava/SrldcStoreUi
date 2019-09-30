import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import {DatePipe} from '@angular/common';

export class DownloadPDF {

  getformatDate(date) {
    let datepipe = new DatePipe('en-US');
    let ddMMyyyy = datepipe.transform(date,"dd-MM-yyyy");
    return ddMMyyyy;
  }

  getSignature(signedBy,empDetails) {
    let Signature = [
      [
        {
          style: 'subheader1',
          text: signedBy + '\n\n',
        },
        {
          style: 'subheader1',
          text: 'Signature\n\n',
        },
        {
          style: 'subheader1',
          text: 'Name: ' + empDetails.name,
        },
        {
          style: 'subheader1',
          text: 'Emp No: ' + empDetails.emp_no,
        },
        {
          style: 'subheader1',
          text: 'Designation: ' + empDetails.designation,
        },
        {
          style: 'subheader1',
          text: 'Department: ' + empDetails.department,
        }
      ]
    ];
    return Signature;
  }

  getSRVSignatures(srvDetails) {
    let srvfooter = {
      absolutePosition: {x: 60, y: -70},
      columns: [
        this.getSignature('Inspected and Accepted By', srvDetails.inspected_by),
        this.getSignature('Counter Signed By', srvDetails.inspected_countersigned_by),
        this.getSignature('Received By', srvDetails.received_by),
        this.getSignature('Counter Signed By', srvDetails.received_countersigned_by)
      ]
    };
    return srvfooter;
  }

  getSIVSignatures(srvDetails,sivDetails) {
    let sivfooter = {
      absolutePosition: {x: 40, y: -70},
      columns: [
        this.getSignature('Inspected and Accepted By', srvDetails.inspected_by),
        this.getSignature('Counter Signed By', srvDetails.inspected_countersigned_by),
        this.getSignature('Received By', srvDetails.received_by),
        this.getSignature('Counter Signed By', srvDetails.received_countersigned_by),
        this.getSignature('Issued to', sivDetails.issued_to)
      ]
    };
    return sivfooter;
  }

  gettableData(items,srvDetails) {
    let table_body = [
      [
        {rowSpan: 2, text: 'Sl.No'},
        {text: 'Material', colSpan: 2},
        {},
        {text: 'Quantity', colSpan: 3},
        {},
        {},
        {text: 'Value', colSpan: 2},
        {},
        {rowSpan: 2, text: 'Remarks'}
      ],
      [
        {},
        {text: 'Description'},
        {text: 'Unit Code'},
        {text: 'Received'},
        {text: 'Rejected'},
        {text: 'Taken In Stock'},
        {text: 'Unit Rate'},
        {text: 'Total Value'},
        {}
      ],
    ];
    items.forEach((item, index) => {
      let list_item = [];
      list_item.push(index+1);
      list_item.push(item.description);
      list_item.push('No.s');
      list_item.push(item.received_qty);
      list_item.push(item.rejected_qty);
      list_item.push(item.received_qty - item.rejected_qty);
      list_item.push(item.unit_rate);
      list_item.push((item.received_qty - item.rejected_qty) * item.unit_rate);
      if (index === 0) {
        list_item.push({text: srvDetails.remarks, rowSpan: items.length});
      } else {
        list_item.push('');
      }
      table_body.push(list_item);
    });
    return table_body;
  }

  getInfo(srvsivtitle) {
    return {title: srvsivtitle};
  }

  getHeader1() {
    return {style: 'header',
            alignment: 'center',
            text: 'POWER SYSTEM OPERATION CORPORATION'};
  }

  getHeader2() {
    return {
      style: 'header',
      alignment: 'center',
      text: 'SOUTHERN REGIONAL LOAD DESPATCH CENTER'
    };
  }

  getHeader3(texttofill) {
    return {
          style: 'subheader',
          alignment: 'center',
          text: texttofill + ' - 3 Copies'
    };
  }

  getHeader4(mode_of_receipt){
    return {
          style: 'subheader1',
          alignment: 'center',
          text: 'Mode Of Receipt: ' + mode_of_receipt
    };
  }

  getSRVNumber(indentDepartment) {
    return {
      style: 'subheader1',
      text: 'SRV SL NO: SRLDC/' + indentDepartment + '/##'
    };
  }

  getSupplier(supplier) {
    return {
      style: 'subheader1',
      text: 'Name of Supplier: ' + supplier
    };
  }

  getIndentRef(modeOfReceipt,indentRef,indentDate){
    return {
      style: 'subheader1',
      text: modeOfReceipt
      + ' with date: '
      + indentRef
      + ' dated ' + this.getformatDate(indentDate)
    };
  }

  getRegion() {
    return {
      style: 'subheader1',
      alignment: 'right',
      text: 'Region: SRLDC'
    };
  }

  getDate() {
    return {
      style: 'subheader1',
      alignment: 'right',
      text: 'Date: ' + this.getformatDate(new Date())
    };
  }

  getIndentDept(indentDept) {
    return {
        style: 'subheader1',
        alignment: 'right',
        text: 'Indenting Department: ' + indentDept
    };
  }

  getStyles() {
    return {
      header: {
        fontSize: 14,
        bold: true,
        color: 'dodgerblue',
      },
      subheader1: {
        fontSize: 10,
        color: 'black'
      },
      subheader: {
        fontsize: 12,
        bold: true,
        decoration: 'underline',
        color: 'dodgerblue' ,
      },
      tableExample: {
        fontSize: 14,
        bold: true,
        color: 'red',
        background: 'black',
        fillColor: 'blue'
      }
    };
  }

  downloadSIVPDF(sivDetails,srvDetails){
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
    let documentDefinition = {
      info: this.getInfo('SIV Form'),
      pageSize: 'A4',
      pageOrientation: 'landscape',
      content: [
        this.getHeader1(),
        this.getHeader2(),
        this.getHeader3('Store Issue Voucher'),
        this.getHeader4(srvDetails.mode_of_receipt),
        {
          columns: [
            [
              this.getSRVNumber(srvDetails.indent_department),
              this.getSupplier(srvDetails.name_supplier),
              this.getIndentRef(srvDetails.mode_of_receipt, srvDetails.indent_ref_no, srvDetails.indent_date),
            ],
            [
              this.getRegion(),
              this.getDate(),
              this.getIndentDept(srvDetails.indent_department),
              {
                style: 'subheader1',
                alignment: 'right',
                text: 'Issue Reason: ' + sivDetails.issued_reason
              }
            ]
          ]
        },
        {
          alignment: 'center',
          margin: [40, 15],
          table: {
            widths: ['auto', 150 , 'auto', 'auto',
            'auto', 'auto', 'auto', 'auto', 150],
            headerRows: 2,
            body:  this.gettableData(srvDetails.items, srvDetails)
          }
        },
      ],
      footer: this.getSIVSignatures(srvDetails, sivDetails),
      styles: this.getStyles()
    };
    pdfMake.createPdf(documentDefinition).open();
  }

  downloadSRVPDF(srvDetails) {
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
    let documentDefinition = {
      info: this.getInfo('SRV Form'),
      pageSize: 'A4',
      pageOrientation: 'landscape',
      content: [
        this.getHeader1(),
        this.getHeader2(),
        this.getHeader3('Store Receipt Voucher'),
        this.getHeader4(srvDetails.mode_of_receipt),
        {
          columns: [
            [
              this.getSRVNumber(srvDetails.indent_department),
              this.getSupplier(srvDetails.name_supplier),
              this.getIndentRef(srvDetails.mode_of_receipt, srvDetails.indent_ref_no, srvDetails.indent_date),
            ],
            [
              this.getRegion(),
              this.getDate(),
              this.getIndentDept(srvDetails.indent_department),
            ]
          ]
        },
        {
          alignment: 'center',
          margin: [40, 15],
          table: {
            widths: ['auto', 150 , 'auto', 'auto',
            'auto', 'auto', 'auto', 'auto', 150],
            headerRows: 2,
            body:  this.gettableData(srvDetails.items, srvDetails)
          }
        },
      ],
      footer: this.getSRVSignatures(srvDetails),
      styles: this.getStyles()
    };
    pdfMake.createPdf(documentDefinition).open();
  }
}
