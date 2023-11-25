return {
	{
		"williamboman/mason-lspconfig.nvim",
		config = function()
			require("mason-lspconfig").setup({
				ensure_installed = {
					"lua_ls",
					"pyright",
					"gopls",
				},
			})
		end,
	},
	{
		"neovim/nvim-lspconfig",
		config = function()
			local lspconfig = require("lspconfig")
			vim.api.nvim_create_autocmd("LspAttach", {
				group = vim.api.nvim_create_augroup("UserLspConfig", {}),
				callback = function(ev)
					vim.bo[ev.buf].omnifunc = "v:lua.vim.lsp.omnifunc"
					local opts = { buffer = ev.buf }
					vim.keymap.set("n", "gD", vim.lsp.buf.declaration, opts)
					vim.keymap.set("n", "gd", vim.lsp.buf.definition, opts)
					vim.keymap.set("n", "K", vim.lsp.buf.hover, opts)
					vim.keymap.set("n", "gi", vim.lsp.buf.implementation, opts)
					vim.keymap.set("n", "<leader>r", vim.lsp.buf.rename, opts)
					vim.keymap.set("n", "g]", "<cmd>lua vim.diagnostic.goto_next({ buffer = 0 })<CR>", opts)
					vim.keymap.set("n", "gl", "<cmd>lua vim.diagnostic.open_float()<CR>", opts)
					vim.keymap.set("n", "g[", "<cmd>lua vim.diagnostic.goto_prev({ buffer = 0 })<CR>", opts)
					vim.keymap.set("n", "<leader>a", "<cmd>lua vim.lsp.buf.code_action()<CR>", opts)
				end,
			})
			-- Pyright
			lspconfig.pyright.setup({
				settings = {
					python = {
						analysis = {
							typeCheckingMode = "off",
						},
					},
				},
			})
			-- Lua_ls
			lspconfig.lua_ls.setup({
				settings = {
					Lua = {
						diagnostics = {
							globals = { "vim" },
						},
						workspace = {
							library = {
								[vim.fn.expand("$VIMRUNTIME/lua")] = true,
								[vim.fn.stdpath("config") .. "/lua"] = true,
							},
						},
					},
				},
			})
			-- Gopls
			lspconfig.gopls.setup({})
			-- Typescript
			lspconfig.tsserver.setup({})
			-- Tailwind css
			lspconfig.tailwindcss.setup({})
			-- Emmet
			lspconfig.emmet_ls.setup({})
			-- Rust
			lspconfig.rust_analyzer.setup({})
			-- Css
			lspconfig.cssls.setup({})
			-- Clangd
			lspconfig.clangd.setup({})
			-- Html
			lspconfig.html.setup({})
			-- CMake
			lspconfig.cmake.setup({})
		end,
	},
}
