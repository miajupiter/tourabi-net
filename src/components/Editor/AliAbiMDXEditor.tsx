"use client"

import React, { FC, ForwardedRef, useEffect, useState } from "react"
import { useLanguage } from '@/hooks/i18n'
import { LeafDirective } from 'mdast-util-directive'
import {
  AdmonitionDirectiveDescriptor,
  MDXEditor,
  UndoRedo,
  codeBlockPlugin,
  codeMirrorPlugin,
  diffSourcePlugin,
  directivesPlugin,
  frontmatterPlugin,
  headingsPlugin,
  imagePlugin,
  linkDialogPlugin,
  linkPlugin,
  listsPlugin,
  markdownShortcutPlugin,
  quotePlugin,
  sandpackPlugin,
  tablePlugin,
  thematicBreakPlugin,
  toolbarPlugin,
  Separator,
  BlockTypeSelect,
  BoldItalicUnderlineToggles,
  CreateLink,
  DiffSourceToggleWrapper,
  InsertImage,
  ListsToggle,
  KitchenSinkToolbar,
  DirectiveDescriptor,
  MDXEditorProps,
  MDXEditorMethods,
  ImageUploadHandler,
  InsertTable,
  InsertThematicBreak,
  CodeToggle,
  CodeMirrorEditor,
  InsertCodeBlock
} from '@mdxeditor/editor'

import '@mdxeditor/editor/style.css'
import './mdx-editor.css'
import { useThemeMode } from '@/hooks/useThemeMode'
import { uploadToS3Bucket } from '@/utils/s3bucketHepler'
export async function expressImageUploadHandler(image: File) {
  const formData = new FormData()
  formData.append('image', image)
  const response = await fetch('/uploads/new', { method: 'POST', body: formData })
  const json = (await response.json()) as { url: string }
  return json.url
}

interface YoutubeDirectiveNode extends LeafDirective {
  name: 'youtube'
  attributes: { id: string }
}




export const EDITOR_PLUGINS = [
  // toolbarPlugin({ toolbarContents: () => <KitchenSinkToolbar  /> }),
  toolbarPlugin({
    toolbarContents: () => <>
      <DiffSourceToggleWrapper options={['rich-text','source','diff']}>
        <UndoRedo />
        <Separator />
        <BlockTypeSelect />
        <BoldItalicUnderlineToggles />
        <Separator />
        <InsertThematicBreak />
        <InsertTable />
        <CodeToggle />
        <CreateLink />
        <Separator />
        <ListsToggle />
        <InsertImage />
        <InsertCodeBlock />
      </DiffSourceToggleWrapper>
    </>
  }),
  listsPlugin(),
  quotePlugin(),
  headingsPlugin({ allowedHeadingLevels: [1, 2, 3, 4] }),
  linkPlugin(),
  linkDialogPlugin(),
  imagePlugin({
    async imagePreviewHandler(imageSource) {
      return new Promise((resolve, reject) => {
        resolve(imageSource)
      })
    },
    // imageAutocompleteSuggestions: ['https://via.placeholder.com/150', 'https://via.placeholder.com/150'],
    async imageUploadHandler(file: File) {
      return new Promise((resolve, reject) => {
        uploadToS3Bucket(file, `mdximages/${file.name}`)
          .then(fileUrl => {
            console.log('fileUrl:', fileUrl)
            resolve(fileUrl)
          })
          .catch(err => {
            console.log('imageUploadHandler err:', err)
            reject(err)
          })
      })
    },
  }),
  tablePlugin(),
  thematicBreakPlugin(),
  frontmatterPlugin(),
  codeBlockPlugin({ defaultCodeBlockLanguage: '' }),

  // // sandpackPlugin({ sandpackConfig: virtuosoSampleSandpackConfig }),
  codeMirrorPlugin({ codeBlockLanguages: { js: 'JavaScript', css: 'CSS', txt: 'Plain Text', tsx: 'TypeScript', '': 'Unspecified' } }),
  directivesPlugin({ directiveDescriptors: [] }),
  diffSourcePlugin({ viewMode: 'rich-text', diffMarkdown: 'boo' }),
  markdownShortcutPlugin()
]


export const AliAbiMDXEditor = ({
  editorRef,
  ...props
}: { editorRef?: ForwardedRef<MDXEditorMethods> | null } & MDXEditorProps) => {

  const { isDarkMode } = useThemeMode()

  return (
    <>
      <MDXEditor
        ref={editorRef}
        className={`${isDarkMode ? 'dark-theme ' : ''} prose lg:prose-xl dark:prose-invert w-full prose-img:rounded-[4px] prose-a:text-blue-600`}
        plugins={EDITOR_PLUGINS}
        toMarkdownOptions={{
          tightDefinitions: true,
          resourceLink: false
        }}
        {...props}
      />
    </>
  )
}

export const VIEWER_PLUGINS = [
  listsPlugin(),
  quotePlugin(),
  headingsPlugin({ allowedHeadingLevels: [1, 2, 3, 4] }),
  linkPlugin(),
  linkDialogPlugin(),
  imagePlugin({
    async imagePreviewHandler(imageSource) {
      return new Promise((resolve, reject) => {
        resolve(imageSource)
      })
    }
  }),
  tablePlugin(),
  thematicBreakPlugin(),
  frontmatterPlugin(),
  codeBlockPlugin({ defaultCodeBlockLanguage: '' }),

  // // sandpackPlugin({ sandpackConfig: virtuosoSampleSandpackConfig }),
  codeMirrorPlugin({ codeBlockLanguages: { js: 'JavaScript', css: 'CSS', txt: 'Plain Text', tsx: 'TypeScript', '': 'Unspecified' } }),
  directivesPlugin({ directiveDescriptors: [] }),
  diffSourcePlugin({ viewMode: 'rich-text', diffMarkdown: 'boo' }),
  markdownShortcutPlugin()
]

export const AliAbiMDXViewer = ({
  editorRef,
  ...props
}: { editorRef?: ForwardedRef<MDXEditorMethods> | null } & MDXEditorProps) => {

  const { isDarkMode } = useThemeMode()

  return (
    <>
      <MDXEditor
        ref={editorRef}
        className={`${isDarkMode ? 'dark-theme ' : ''} mdxviewer prose lg:prose-lg xl:prose-xl dark:prose-invert w-full prose-img:rounded-[4px] prose-a:text-blue-600`}
        plugins={VIEWER_PLUGINS}
        toMarkdownOptions={{
          tightDefinitions: true,
          resourceLink: false
        }}
        readOnly={true}
        {...props}
      />
    </>
  )
}


export default AliAbiMDXViewer
