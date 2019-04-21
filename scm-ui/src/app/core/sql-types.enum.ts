export const SqlTypes = {
  stringType: [
    'char',
    'nchar',
    'ntext',
    'nvarchar',
    'text',
    'varchar'
  ],
  numericType : [
    'bigint',
    'decimal',
    'float',
    'int',
    'money',
    'numeric',
    'tinyint'
  ],
  dateType: [
    'date',
    'datetime',
    'datetime2',
    'datetimeoffset',
    'time',
    'timestamp'
  ],
  othersType: [
    'bit',
    'image',
    'uniqueidentifier',
    'varbinary',
    'xml'
  ],
  controlesType: [{
    type: 'text-box',
    desc: 'Text Box'
  }, {
    type: 'drop-down',
    desc: 'Dropdown List'
  }, {
    type: 'text-box-numeric',
    desc: 'Numeric Text Box'
  }, {
    type: 'check-box',
    desc: 'Check Box'
  }, {
    type: 'radio-button',
    desc: 'Radio Button'
  }, {
    type: 'text-area',
    desc: 'Text Area'
  }]
};
