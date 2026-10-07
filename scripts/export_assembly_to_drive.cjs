/**
 * History Revision Hub — Export Assembly to Dep File (Google Drive)
 *
 * Streamlined: Keeps only the master PowerPoint (.pptx) and Pupil Prompt Script (.pdf)
 * Destination: G:\My Drive\AAMX\Dep File\Assemblies\
 */

const fs = require('fs');
const path = require('path');

const DEP_FILE_ROOT = 'G:\\My Drive\\AAMX\\Dep File';
const ASSEMBLIES_DIR = path.join(DEP_FILE_ROOT, 'Assemblies');

const PUBLIC_DIR = path.join(__dirname, '..', 'public');
const PDF_SRC = path.join(PUBLIC_DIR, 'pdfs', 'assembly_beyond_the_single_story_pupil_script.pdf');
const PPTX_SRC = path.join(PUBLIC_DIR, 'assembly_beyond_the_single_story.pptx');

async function run() {
  if (!fs.existsSync(DEP_FILE_ROOT)) {
    console.error(`Error: Google Drive Dep File not found at ${DEP_FILE_ROOT}`);
    process.exit(1);
  }

  // Ensure Assemblies directory exists
  if (!fs.existsSync(ASSEMBLIES_DIR)) {
    fs.mkdirSync(ASSEMBLIES_DIR, { recursive: true });
    console.log(`Created: ${ASSEMBLIES_DIR}`);
  }

  // 1. Copy PowerPoint presentation (.pptx)
  if (fs.existsSync(PPTX_SRC)) {
    const pptxDest = path.join(ASSEMBLIES_DIR, 'Beyond_the_Single_Story_Assembly.pptx');
    fs.copyFileSync(PPTX_SRC, pptxDest);
    console.log(`✅ Synced PowerPoint: ${pptxDest}`);
  } else {
    console.warn(`⚠️ Warning: PPTX source not found at ${PPTX_SRC}`);
  }

  // 2. Copy Pupil Delivery Script PDF (.pdf)
  if (fs.existsSync(PDF_SRC)) {
    const pdfDest = path.join(ASSEMBLIES_DIR, 'Beyond_the_Single_Story_Pupil_Script.pdf');
    fs.copyFileSync(PDF_SRC, pdfDest);
    console.log(`✅ Synced Script PDF: ${pdfDest}`);
  } else {
    console.warn(`⚠️ Warning: PDF source not found at ${PDF_SRC}`);
  }

  // 3. Purge redundant clutter: docx, html, READMEs, image dumps, and duplicate subfolders
  const filesToDelete = [
    path.join(ASSEMBLIES_DIR, 'Beyond_the_Single_Story_Assembly_Script.docx'),
    path.join(ASSEMBLIES_DIR, 'README_Assemblies.md'),
    path.join(ASSEMBLIES_DIR, 'Beyond_the_Single_Story_Presentation.html'),
    path.join(
      DEP_FILE_ROOT,
      '00_Department_Admin_and_Policies',
      'Beyond_the_Single_Story_Assembly.pptx',
    ),
    path.join(
      DEP_FILE_ROOT,
      '00_Department_Admin_and_Policies',
      'Beyond_the_Single_Story_Pupil_Script.pdf',
    ),
  ];

  filesToDelete.forEach((filePath) => {
    if (fs.existsSync(filePath)) {
      try {
        fs.unlinkSync(filePath);
        console.log(`🧹 Removed redundant file: ${filePath}`);
      } catch (err) {
        console.warn(`Could not remove ${filePath}:`, err.message);
      }
    }
  });

  // Purge duplicate subfolder if present
  const redundantSubdir = path.join(
    ASSEMBLIES_DIR,
    'Beyond_the_Single_Story_Black_British_History',
  );
  if (fs.existsSync(redundantSubdir)) {
    try {
      fs.rmSync(redundantSubdir, { recursive: true, force: true });
      console.log(`🧹 Removed redundant subfolder and image dump: ${redundantSubdir}`);
    } catch (err) {
      console.warn(`Could not remove ${redundantSubdir}:`, err.message);
    }
  }

  console.log('\n=============================================================');
  console.log('🎉 Assemblies folder streamlined: Exactly 2 clean files retained:');
  console.log('   1. Beyond_the_Single_Story_Assembly.pptx');
  console.log('   2. Beyond_the_Single_Story_Pupil_Script.pdf');
  console.log('=============================================================');
}

run().catch((err) => {
  console.error('Export error:', err);
  process.exit(1);
});
