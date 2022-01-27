# wordpress-create-gutenberg - плагин для создания своих блоков, компонентов

- используется @wordpress/create-block, доработал структуру файлов, папок и всякие настройки
- src/blocks - тут свои блоки настраиваются. Чтобы добавить другой блок, дублируем блок povly-block, меняем название и настройки нужные. Позже не забудьте импортировать их в src/index.js чтобы зарегистрировать блок.
- src/components - тут свои компоненты, аналогично делается как из папки src/blocks

[Документация Gutenberg по готовым компонентам для редактора - внутри блока](https://github.com/WordPress/gutenberg/tree/8ba8c6d8ec69f9239af32f9a47c0d00ef70eef5e/packages/block-editor/src/components)

[Документация Gutenberg по готовым компонентам для редактора - боковая панель, сайдбар](https://github.com/WordPress/gutenberg/tree/8ba8c6d8ec69f9239af32f9a47c0d00ef70eef5e/packages/components/src)

[Документация Gutenberg](https://github.com/WordPress/gutenberg)

Остальные возможности находятся в папке packages - если нужно допустим переводчик то i18n, если fetch чтобы получить запрос то api-fetch и так далее
