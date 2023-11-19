return {
	"stevearc/conform.nvim",
	dependencies = { "mason.nvim" },
	lazy = true,
	cmd = "ConformInfo",
	keys = {
		{
			"<leader>f",
			function()
				require("conform").format({ formatters = { "injected" } })
			end,
			mode = { "n", "v" },
			desc = "Format Injected Langs",
		},
	},
	config = function()
		require("conform").setup({
			format_on_save = {
				timeout_ms = 3000,
				lsp_fallback = true,
				-- local_ignore_filetypes = { "org" },
			},
			formatters_by_ft = {
				lua = { "stylua" },
				python = { "isort", "black" },
				javascript = { { "prettierd", "prettier" } },
				go = { "goimports", "gofmt" },
				css = { "prettier" },
				typescript = { "prettier" },
				jsonc = { "prettier" },
				javascriptreact = { "prettier" },
				scss = { "prettier" },
				html = { "prettier" },
				typescriptreact = { "prettier" },
				json = { "jq" },
			},
		})
	end,
}
