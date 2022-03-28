module.exports = {
	extends: ['stylelint-config-standard', 'stylelint-config-prettier'], //继承都规则属性
	ignoreFiles: [
		//忽略都文件
		'**/*.ts',
		'**/*.tsx',
		'**/*.png',
		'**/*.jpg',
		'**/*.jpeg',
		'**/*.gif',
		'**/*.mp3',
		'**/*.json',
		'./src/styles/*.less',
		'/node_modules'
	],
	rules: {
		'max-nesting-depth': 3, //限制嵌套的深度
		// "alpha-value-notation":"number", //所有的值都必须用数字都形式来展示，比如50%为不合法，0.5为合法。可以自动修复
		'media-feature-name-no-unknown': true, //禁止使用未知的媒体特性名称
		'at-rule-no-unknown': [
			// 不允许at-rules不明。
			true,
			{
				ignoreAtRules: ['extends', 'ignores']
			}
		],
		// indentation: 2, //指定缩进
		'number-leading-zero': 'always', // 要求或禁止小于1的小数前导零(可自动修复)。
		'unit-allowed-list': ['em', 'rem', 's', 'px', 'deg', 'all', 'vh', '%'], //指定允许的单位列表
		'no-eol-whitespace': [
			//禁止行尾空白(可自动修复)。
			true,
			{
				ignore: 'empty-lines'
			}
		],
		'declaration-block-trailing-semicolon': 'always', //要求或禁止在声明块中使用尾随分号(可自动修复)。
		'selector-pseudo-class-no-unknown': [
			//禁止未知的伪类选择器。
			true,
			{
				ignorePseudoClasses: ['global']
			}
		],
		'block-closing-brace-newline-after': 'always',
		'declaration-block-semicolon-newline-after': 'always', // 要求或禁止在声明块中使用尾随分号(可自动修复)。
		'no-descending-specificity': null, //不允许低特异性的选择器出现在高特异性的选择器之后
		'selector-list-comma-newline-after': 'always', //要求换行或禁止选择器列表的逗号后有空格(可自动修复)。
		'selector-pseudo-element-colon-notation': 'single', //selector-pseudo-element-colon-notation
		'block-no-empty': true //不允许空的块
	}
}
