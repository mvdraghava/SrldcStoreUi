export class SrvsivDetails {
  srvdetails = {
    mode_of_receipt: '',
    name_supplier: '',
    indent_ref_no: '',
    indent_date: '',
    srvsiv_date: '',
    indent_department: '',
    inspected_by: {
      emp_no: '',
      name: '',
      designation: '',
      department: '',
    },
    inspected_countersigned_by: {
      emp_no: '',
      name: '',
      designation: '',
      department: '',
    },
    received_by: {
      emp_no: '',
      name: '',
      designation: '',
      department: '',
    },
    received_countersigned_by: {
      emp_no: '',
      name: '',
      designation: '',
      department: '',
    },
    items : [{
      description: '',
      received_qty: 0,
      rejected_qty: 0,
      unit_rate: 0
    }],
    remarks: ''
  };
  sivdetails = {
    issued_reason: '',
    issued_to: {
      emp_no: '',
      name: '',
      designation: '',
      department: '',
    }
  };
  srvid = '';
}
