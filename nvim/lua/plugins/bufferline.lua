return {
	"akinsho/bufferline.nvim",
	version = "*",
	lazy = false,
	dependencies = { "nvim-tree/nvim-web-devicons" },
	keys = {
		{ "<S-l>", "<cmd>bnext<CR>", desc = "Open next buffer" },
		{ "<S-h>", "<cmd>bprevious<CR>", desc = "Open next buffer" },
		{ "<S-w>", "<cmd>bdelete<CR>", desc = "Close current buffer" },
	},
	config = function()
		require("bufferline").setup({
			options = {
				diagnostics = "nvim_lsp",
				offsets = {
					filetype = "NvimTree",
					text = "File Explorer",
					text_align = "left",
					separator = true,
				},
				-- separator_style = "slant",
				hover = {
					enabled = true,
					delay = 200,
					reveal = { "close" },
				},
				highlights = {
					fill = {
						bg = {
							attribute = "fg",
							highlight = "Pmenu",
						},
					},
				},
			},
		})
	end,
}
