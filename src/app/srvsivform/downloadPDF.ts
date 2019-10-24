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
      list_item.push(((item.received_qty - item.rejected_qty) * item.unit_rate).toFixed(3));
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

  getSRVNumber(indentDepartment, id) {
    return {
      style: 'subheader1',
      text: 'SRV SL NO: SRLDC/Stores/' + indentDepartment + '/' + id.toString()
    };
  }

  getSIVNumber(indentDepartment, id) {
    return {
      style: 'subheader1',
      text: 'SIV SL NO: SRLDC/Stores/' + indentDepartment + '/' + id.toString()
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

  getDate(srvsivDate) {
    return {
      style: 'subheader1',
      alignment: 'right',
      text: 'Date: ' + this.getformatDate(srvsivDate)
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

  getLogo() {
    return {
      image: 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAGoAAABuCAIAAABA0hHWAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyBpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYxIDY0LjE0MDk0OSwgMjAxMC8xMi8wNy0xMDo1NzowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBXaW5kb3dzIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkEyN0IzMDE0MkM5MjExRTY4OUI3OEM1OTdDNEZBQUEzIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkEyN0IzMDE1MkM5MjExRTY4OUI3OEM1OTdDNEZBQUEzIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6QTI3QjMwMTIyQzkyMTFFNjg5Qjc4QzU5N0M0RkFBQTMiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6QTI3QjMwMTMyQzkyMTFFNjg5Qjc4QzU5N0M0RkFBQTMiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4aZ8SUAABEn0lEQVR42ty9B4BURdYG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POSOCO_Final_Logo.',
      fit: [50, 50],
      absolutePosition: {x: 210, y: 30}
    };
  }

  downloadSIVPDF(sivDetails,srvDetails, id){
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
    let documentDefinition = {
      info: this.getInfo('SIV Form'),
      pageSize: 'A4',
      pageOrientation: 'landscape',
      content: [
        this.getLogo(),
        this.getHeader1(),
        this.getHeader2(),
        this.getHeader3('Store Issue Voucher'),
        this.getHeader4(srvDetails.mode_of_receipt),
        {
          columns: [
            [
              this.getSIVNumber(srvDetails.indent_department, id),
              this.getSupplier(srvDetails.name_supplier),
              this.getIndentRef(srvDetails.mode_of_receipt, srvDetails.indent_ref_no, srvDetails.indent_date),
            ],
            [
              this.getRegion(),
              this.getDate(srvDetails.srvsiv_date),
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
      footer(currentPage, PageCount) {
        if (currentPage == PageCount) {
          let x = callfunction1();
          return x;
        }
      },
      styles: this.getStyles()
    };
    let callfunction1 = function() {
      let ianda = Signatures('Inspected and Accepted By', srvDetails.inspected_by);
      let csb = Signatures('Counter Signed By', srvDetails.inspected_countersigned_by);
      let rb = Signatures('Received By', srvDetails.received_by);
      let rcsb = Signatures('Counter Signed By', srvDetails.received_countersigned_by);
      let it = Signatures('Issued to', sivDetails.issued_to);
      let sivfooter = {
        absolutePosition: {x: 40, y: -70},
        columns: [
          ianda,
          csb,
          rb,
          rcsb,
          it
        ]
      };
      return sivfooter;
    };
    let Signatures = function(signedBy,empDetails) {
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
    };
    pdfMake.createPdf(documentDefinition).download("SIV_"+srvDetails.name_supplier);
  }



  downloadSRVPDF(srvDetails, id) {
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
    let documentDefinition = {
      info: this.getInfo('SRV Form'),
      pageSize: 'A4',
      pageOrientation: 'landscape',
      content: [
        this.getLogo(),
        this.getHeader1(),
        this.getHeader2(),
        this.getHeader3('Store Receipt Voucher'),
        this.getHeader4(srvDetails.mode_of_receipt),
        {
          columns: [
            [
              this.getSRVNumber(srvDetails.indent_department, id),
              this.getSupplier(srvDetails.name_supplier),
              this.getIndentRef(srvDetails.mode_of_receipt, srvDetails.indent_ref_no, srvDetails.indent_date),
            ],
            [
              this.getRegion(),
              this.getDate(srvDetails.srvsiv_date),
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
    pdfMake.createPdf(documentDefinition).download("SRV_"+srvDetails.name_supplier);
  }
}
