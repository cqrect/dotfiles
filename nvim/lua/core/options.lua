local options = {
	clipboard = "unnamedplus",
	cmdheight = 1,
	showmode = true,
	conceallevel = 0,
	termguicolors = true,
	mouse = "a",
	fileencoding = "utf-8",
	ignorecase = true,
	smartcase = true,
	smartindent = true,
	tabstop = 4,
	shiftwidth = 4,
	number = true,
	relativenumber = true,
	showtabline = 2,
	wrap = true,
	cursorline = true,
	cursorcolumn = false,
	showcmd = true,
	backup = false,
	hlsearch = true,
	splitbelow = true,
	splitright = true,
	swapfile = true,
	timeoutlen = 300,
	undofile = true,
	writebackup = false,
	expandtab = true,
	signcolumn = "yes",
	scrolloff = 8,
	sidescrolloff = 8,
	guifont = "FiraCode Nerd Font:h14",
	linebreak = true,
}

vim.opt.shortmess:append("c")
for k, v in pairs(options) do
	vim.opt[k] = v
end

vim.cmd("set whichwrap+=<,>,[,],h,l")

local alpha = function()
	return string.format("%x", math.floor((255 * vim.g.transparency) or 0.8))
end

vim.g.neovide_transparency = 0.7
vim.g.transparency = 0.7
vim.g.neovide_background_color = "#1e1e2e" .. alpha()

vim.g.gui_font_default_size = 17
vim.g.gui_font_size = vim.g.gui_font_default_size
vim.g.gui_font_face = "FiraCode Nerd Font"

RefreshGuiFont = function()
	vim.opt.guifont = string.format("%s:h%s", vim.g.gui_font_face, vim.g.gui_font_size)
end

ResizeGuiFont = function(delta)
	vim.g.gui_font_size = vim.g.gui_font_size + delta
	RefreshGuiFont()
end

ResetGuiFont = function()
	vim.g.gui_font_size = vim.g.gui_font_default_size
	RefreshGuiFont()
end

-- Call function on startup to set default value
ResetGuiFont()

-- Keymaps

local opts = { noremap = true, silent = true }

vim.keymap.set({ "n", "i" }, "<C-+>", function()
	ResizeGuiFont(1)
end, opts)
vim.keymap.set({ "n", "i" }, "<C-->", function()
	ResizeGuiFont(-1)
end, opts)
vim.keymap.set({ "n", "i" }, "<C-BS>", function()
	ResetGuiFont()
end, opts)
