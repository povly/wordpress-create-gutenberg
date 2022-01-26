# create-gutenberg - плагин для создания своих блоков, компонентов

- используется @wordpress/create-block, доработал структуру файлов, папок и всякие настройки. Со временем думаю еще новое добавлю - фильтры, хуки
- src/blocks - тут свои блоки настраиваются
- src/components - тут свои компоненты
- после создания блоков и компонентов, их надо импортировать в src/index.js - там уже будет пример

[Документация Gutenberg по готовым компонентам для редактора - внутри блока](https://github.com/WordPress/gutenberg/tree/8ba8c6d8ec69f9239af32f9a47c0d00ef70eef5e/packages/block-editor/src/components)

[Документация Gutenberg по готовым компонентам для редактора - боковая панель, сайдбар](https://github.com/WordPress/gutenberg/tree/8ba8c6d8ec69f9239af32f9a47c0d00ef70eef5e/packages/components/src)

[Документация Gutenberg](https://github.com/WordPress/gutenberg)

остальное все смотрите в папке packages - если нужно допустим переводчик то i18n, если fetch чтобы получить запрос то api-fetch и так далее
